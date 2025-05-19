import WinnerCard from '@/components/WinnerCard/WinnerCard';
import CommentCard from '@/components/Comment/Comment';
import CharacterCard from '@/components/Character/Character';
import useIsMobile from '@/hook/useIsMobile';
import CommentInputField from '@/components/Comment/CommentInputField';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IMAGES } from '@/constants/imagePath';
import { useComment } from '@/hook/useComment';
import { useEffect } from 'react';
import Loading from '../Loading/Loading';

interface CommentProps {
  setIsLoading: (loading: boolean) => void;
  onError?: (e: unknown) => void;
}

const CommentContext = ({ setIsLoading, onError }: CommentProps) => {
  const user = useSelector((state: RootState) => state.auth.user)!;
  const isMobile = useIsMobile();

  const {
    results,
    comments,
    commentText,
    setCommentText,
    resultsLoading,
    commentsLoading,
    commentsEndRef,
    submitComment,
    refreshComments,
  } = useComment({ onError });

  // isLoading 값은 두 로딩 상태가 모두 끝났을 때 false
  useEffect(() => {
    setIsLoading(resultsLoading || commentsLoading);
  }, [resultsLoading, commentsLoading, setIsLoading]);

  // 댓글 목록이 바뀔 때마다 스크롤 아래로
  useEffect(() => {
    if (comments.length > 0) {
      requestAnimationFrame(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
      });
    }
  }, [comments, commentsEndRef]);

  // 리사이즈 이벤트 감지 후 스크롤 내리기
  useEffect(() => {
    const handleResize = () => {
      if (comments.length > 0) {
        commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [comments, commentsEndRef]);

  if (resultsLoading || commentsLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="md:h-full flex flex-col justify-center items-center">
      {/* 제목 */}
      <div className="flex justify-center items-center gap-3 md:gap-7 md:pt-0 pt-5">
        <img src={IMAGES.POPPER_LEFT} className="w-[40px] md:w-[80px]" alt="popper-left" />
        <h1 className="text-2xl font-pm md:text-3xl">투표 결과</h1>
        <img src={IMAGES.POPPER_RIGHT} className="w-[40px] md:hidden" alt="popper-right" />
      </div>

      <div className="px-5 py-10 flex flex-col justify-center items-center md:flex-row md:p-3 gap-10 md:gap-30">
        {/* 카드 영역 */}
        <div className="w-full md:w-auto flex justify-center relative">
          <div className="grid grid-cols-2 grid-rows-2 gap-6 md:gap-x-10 md:gap-y-0">
            {results.map((poll, idx) => (
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
        <div className="h-[550px] md:h-[550px] border border-gray-300 rounded-2xl flex flex-col justify-center items-center px-4 py-2">
          {/* 댓글 리스트 */}
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

          {/* 댓글 입력창 */}
          <div className="mt-4">
            <CommentInputField
              nickname={user.randomNickname}
              comment={commentText}
              onChangeComment={(e) => setCommentText(e.target.value)}
              onSubmit={() => submitComment(user.userId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentContext;
