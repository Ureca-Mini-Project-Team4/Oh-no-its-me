import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useComment } from '@/hook/useComment';
import { useMediaQuery } from 'react-responsive';
import WinnerCard from '@/components/WinnerCard/WinnerCard';
import CommentCard from '@/components/Comment/Comment';
import CharacterCard from '@/components/Character/Character';
import CommentInputField from '@/components/Comment/CommentInputField';
import Loading from '@/components/Loading/Loading';
import { IMAGES } from '@/constants/imagePath';

const Comment = () => {
  const user = useSelector((state: RootState) => state.auth.user)!;
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const {
    results,
    resultsLoading,
    comments,
    commentsLoading,
    commentText,
    setCommentText,
    commentsEndRef,
    submitComment,
    refreshComments,
  } = useComment({ onError: setError });

  useEffect(() => {
    setIsLoading(resultsLoading || commentsLoading);
  }, [resultsLoading, commentsLoading]);

  useEffect(() => {
    if (error) navigate('/main');
  }, [error, navigate]);

  useEffect(() => {
    if (comments.length > 0) {
      requestAnimationFrame(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
      });
    }
  }, [comments]);

  useEffect(() => {
    const handleResize = () => {
      if (comments.length > 0) {
        commentsEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [comments]);

  if (isLoading) return <Loading />;

  return (
    <div className="md:pt-0 pt-130 relative w-full h-full min-h-screen flex justify-center items-center">
      <div className="md:h-full flex flex-col justify-center items-center z-10">
        <div className="flex justify-center items-center gap-3 md:gap-7 md:pt-0 pt-5">
          <img src={IMAGES.POPPER_LEFT} className="w-[40px] md:w-[50px]" alt="popper-left" />
          <h1 className="text-2xl font-pm md:text-3xl">투표 결과</h1>
          <img src={IMAGES.POPPER_RIGHT} className="w-[40px] md:hidden" alt="popper-right" />
        </div>

        <div className="px-5 py-10 flex flex-col justify-center items-center md:flex-row md:p-3 gap-10 md:gap-30">
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

          <div className="h-[550px] md:h-[550px] border border-gray-300 rounded-2xl flex flex-col justify-center items-center px-4 py-2">
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? null : comments.length === 0 ? (
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

            {/* 댓글 입력 */}
            <div className="mt-4">
              <CommentInputField
                nickname={user.randomNickname}
                comment={commentText}
                onChangeComment={(e) => setCommentText(e.target.value)}
                onSubmit={async () => submitComment(user.userId)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
