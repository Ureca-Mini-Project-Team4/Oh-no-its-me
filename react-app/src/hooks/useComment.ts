import { useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLatestPollIds } from '@/apis/poll/getPollLatest';
import { getVoteResultByPollId } from '@/apis/vote/getVoteResultByPollId';
import { getComments } from '@/apis/comment/getAllComments';
import { postComment } from '@/apis/comment/postComment';

interface UseCommentProps {
  onError?: (e: unknown) => void;
}

export function useComment({ onError }: UseCommentProps) {
  const [commentText, setCommentText] = useState('');
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: pollIds = [] } = useQuery({
    queryKey: ['pollIds'],
    queryFn: getLatestPollIds,
  });

  const { data: results = [], isLoading: resultsLoading } = useQuery({
    queryKey: ['voteResults', pollIds],
    queryFn: () => Promise.all(pollIds.map((pollId) => getVoteResultByPollId({ pollId }))),
    enabled: pollIds.length > 0,
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  const commentMutation = useMutation({
    mutationFn: async (userId: number) => {
      await postComment({
        user_id: userId,
        comment_text: commentText,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setCommentText('');
      scrollToBottom();
    },
    onError,
  });

  const submitComment = (userId: number) => {
    if (!commentText.trim()) {
      alert('내용을 입력해주세요');
      return;
    }
    commentMutation.mutate(userId);
  };

  const refreshComments = async () => {
    await queryClient.invalidateQueries({ queryKey: ['comments'] });
  };

  return {
    results,
    resultsLoading,
    comments,
    commentsLoading,
    commentText,
    setCommentText,
    commentsEndRef,
    submitComment,
    refreshComments,
  };
}
