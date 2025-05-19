// useComment.ts
import { useEffect, useState, useRef } from 'react';
import { getLatestPollIds } from '@/apis/poll/getPollLatest';
import { getComments } from '@/apis/comment/getAllComments';
import { postComment } from '@/apis/comment/postComment';
import {
  getVoteResultByPollId,
  getVoteResultByPollIdResponse,
} from '@/apis/vote/getVoteResultByPollId';
import { CommentResponse } from '@/apis/comment/getComment';

interface UseCommentProps {
  onError?: (e: unknown) => void;
}

export function useComment({ onError }: UseCommentProps) {
  const [results, setResults] = useState<getVoteResultByPollIdResponse[]>([]);
  const [pollIds, setPollIds] = useState<number[]>([]);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [commentText, setCommentText] = useState('');
  const [resultsLoading, setResultsLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const commentsEndRef = useRef<HTMLDivElement>(null);

  // 최신 pollIds 불러오기
  useEffect(() => {
    const fetchPollIds = async () => {
      try {
        const res = await getLatestPollIds();
        setPollIds(res ?? []);
      } catch (error) {
        onError?.(error);
        setPollIds([]);
      }
    };
    fetchPollIds();
  }, [onError]);

  // pollIds가 갱신되면 결과 가져오기
  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (pollIds.length === 0) {
          setResults([]);
          setResultsLoading(false);
          return;
        }

        setResultsLoading(true);
        const res = await Promise.all(pollIds.map((pollId) => getVoteResultByPollId({ pollId })));
        setResults(res);
      } catch (error) {
        onError?.(error);
      } finally {
        setResultsLoading(false);
      }
    };

    fetchResults();
  }, [pollIds, onError]);

  // 댓글 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setCommentsLoading(true);
        const res = await getComments();
        setComments(res);
      } catch (error) {
        onError?.(error);
      } finally {
        setCommentsLoading(false);
      }
    };
    fetchComments();
  }, [onError]);

  // 댓글 등록 후 스크롤 이동 함수
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  // 댓글 등록
  const submitComment = async (userId: number) => {
    if (!commentText.trim()) {
      alert('내용을 입력해주세요');
      return;
    }

    try {
      await postComment({
        user_id: userId,
        comment_text: commentText,
      });
      const updatedComments = await getComments();
      setComments(updatedComments);
      setCommentText('');
      scrollToBottom();
    } catch (error) {
      onError?.(error);
    }
  };

  // 댓글 새로고침
  const refreshComments = async () => {
    try {
      const res = await getComments();
      setComments(res);
    } catch (error) {
      onError?.(error);
    }
  };

  return {
    results,
    comments,
    commentText,
    setCommentText,
    resultsLoading,
    commentsLoading,
    commentsEndRef,
    submitComment,
    refreshComments,
  };
}
