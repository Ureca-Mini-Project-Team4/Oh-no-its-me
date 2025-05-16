import WinnerCard from '@/components/WinnerCard/WinnerCard';
import {
  getVoteResultByPollId,
  getVoteResultByPollIdResponse,
} from './../apis/vote/getVoteResultByPollId';
import { useEffect, useState } from 'react';
import { getLatestPollIds } from '@/apis/poll/getPollLatest';
import { CommentResponse } from '@/apis/comment/getComment';
import { getComments } from '@/apis/comment/getAllComments';
import CommentCard from '@/components/Comment/Comment';
import CharacterCard from '@/components/Character/Character';
import useIsMobile from '@/hook/useIsMobile';
import CommentInputField from '@/components/Comment/CommentInputField';
import Loading from '@/components/Loading/Loading';
import { postComment } from '@/apis/comment/postComment';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Comment = () => {
  // 사용자 정보
  const user = useSelector((state: RootState) => state.auth.user)!;

  const isMobile = useIsMobile();

  // 결과 조회
  const [results, setResults] = useState<getVoteResultByPollIdResponse[]>([]);
  const [pollIds, setPollIds] = useState<number[]>([]);

  // 댓글 조회
  const [comments, setComments] = useState<CommentResponse[]>([]);

  // 댓글 입력창 상태 추가
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 댓글 맨 아래로 내리기
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // 최신 pollIds 불러오기
  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const res = await getLatestPollIds();
        console.log('최신 투표 id', res);
        setPollIds(res);
      } catch (error) {
        console.error('투표 결과 불러오기 실패 : ', error);
      }
    };
    fetchAllResults();
  }, []);

  // pollIds가 갱신되면 결과 가져오기
  useEffect(() => {
    const fetchResultsByPollIds = async () => {
      try {
        if (pollIds.length === 0) return;
        setIsLoading(true); // 로딩 시작
        const res = await Promise.all(pollIds.map((pollId) => getVoteResultByPollId({ pollId })));
        setResults(res);
      } catch (error) {
        console.log('투표 결과 불러오기 실패 : ', error);
      } finally {
        setIsLoading(false); // 로딩 끝
      }
    };

    fetchResultsByPollIds();
  }, [pollIds]);

  // 댓글 불러오기
  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await getComments();
        setComments(res);
      } catch (error) {
        console.log('댓글 불러오기 실패 : ', error);
      }
    };
    getAllComments();
  }, []);

  // 댓글 등록 후 스크롤 이동 호출
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  // 댓글 목록이 바뀔 때마다 스크롤을 아래로
  useEffect(() => {
    if (comments.length > 0) {
      requestAnimationFrame(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
      });
    }
  }, [comments]);

  // 리사이즈 이벤트 감지 후 스크롤 내리기
  useEffect(() => {
    const handleResize = () => {
      // 댓글이 존재하면 맨 아래로 스크롤
      if (comments.length > 0) {
        commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [comments]);

  // 댓글 등록
  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      alert('내용을 입력해주세요');
      return;
    }
    try {
      console.log('댓글 내용 : ', commentText);
      await postComment({
        user_id: user.userId,
        comment_text: commentText,
      });

      const updatedComments = await getComments();
      setComments(updatedComments);
      setCommentText('');
      scrollToBottom();
    } catch (error) {
      console.log('댓글 등록 실패', error);
    }
  };

  // 댓글 목록 새로고침 함수
  const refreshComments = async () => {
    try {
      const res = await getComments();
      setComments(res);
    } catch (error) {
      console.error('댓글 갱신 실패', error);
    }
  };

  return (
    <div className="pt-10 sm:p-5 flex flex-col justify-center items-center">
      {/* 제목 */}
      <div className="flex justify-center items-center gap-3 sm:gap-7 sm:pt-0 pt-5">
        <img
          src="/assets/images/popper-right.png"
          className="w-[40px] sm:w-[100px]"
          alt="popper-left"
        />
        <h1 className="text-2xl font-pm sm:text-3xl">투표 결과</h1>
        <img
          src="/assets/images/popper-left.png"
          className="w-[40px] sm:hidden"
          alt="popper-right"
        />
      </div>

      <div className="px-5 py-10 flex flex-col sm:flex-row sm:p-3 gap-10 sm:gap-30">
        {/* 카드 영역 */}
        <div className="w-full sm:w-auto flex justify-center relative">
          {/* 로딩 스피너 */}
          {isLoading && (
            <div className="sm:w-[400px] absolute inset-0 flex justify-center items-center bg-white/80 z-10">
              <Loading />
            </div>
          )}

          <div className="grid grid-cols-2 grid-rows-2 gap-6 sm:gap-x-10 sm:gap-y-0">
            {!isLoading &&
              results.map((poll, idx) => (
                <div
                  key={poll.pollId}
                  className={`w-full ${!isMobile && idx % 2 === 1 ? 'mt-7' : ''}`}
                >
                  <WinnerCard
                    text={poll.questionText}
                    name={poll.results[0].username}
                    num={idx}
                    icon={poll.icon}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* 댓글 영역 */}
        <div className=" h-[550px] sm:h-[550px] border border-gray-300 rounded-2xl flex flex-col justify-between px-4 py-2">
          {/* 스크롤 가능한 댓글 리스트 */}
          <div className="flex-1 overflow-y-auto pr-2">
            {comments.length === 0 ? (
              <div className="pl-10 w-full flex items-center justify-center h-full">
                <CharacterCard />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 w-full">
                {comments.map((comment) => (
                  <CommentCard
                    key={comment.comment_id}
                    nickname={comment.random_nickname}
                    commentText={comment.comment_text}
                    commentId={comment.comment_id}
                    onUpdate={refreshComments}
                  />
                ))}

                <div ref={commentsEndRef} />
              </div>
            )}
          </div>

          {/* 고정된 입력창 */}
          <div className="mt-4">
            <CommentInputField
              nickname={user.randomNickname}
              comment={commentText}
              onChangeComment={(e) => setCommentText(e.target.value)}
              onSubmit={handleSubmitComment} // 이 부분 추가
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
