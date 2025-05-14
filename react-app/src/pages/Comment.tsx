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
import { Dropdown } from '@/components/Comment/Dropdown';

const Comment = () => {
  const isMobile = useIsMobile();

  // 결과 조회
  const [results, setResults] = useState<getVoteResultByPollIdResponse[]>([]);
  const [pollIds, setPollIds] = useState<number[]>([]);

  // 댓글 조회
  const [comments, setComments] = useState<CommentResponse[]>([]);

  // 최신 pollIds 불러오기
  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const res = await getLatestPollIds();
        console.log('댓글', res);
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

        const res = await Promise.all(pollIds.map((pollId) => getVoteResultByPollId({ pollId })));
        setResults(res);
      } catch (error) {
        console.log('투표 결과 불러오기 실패 : ', error);
      }
    };

    fetchResultsByPollIds();
  }, [pollIds]);

  // 댓글 불러오기
  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await getComments();
        if (res.length === 0) {
        }
        setComments(res);
      } catch (error) {
        console.log('댓글 불러오기 실패 : ', error);
      }
    };
    getAllComments();
  }, comments);

  return (
    <>
      <div className="p-10 sm:p-5 flex flex-col justify-center items-center">
        {/* 제목 */}
        <div className="flex justify-center items-center gap-3 sm:gap-7 sm:pt-0 pt-5">
          {/* 왼쪽 이미지: 모바일에서만 보이게 */}
          <img
            src="/assets/images/popper-right.png"
            className="w-[40px] sm:w-[100px]"
            alt="popper-left"
          />
          <h1 className="text-2xl font-pm sm:text-3xl">투표 결과</h1>
          {/* 오른쪽 이미지: 모든 화면에서 보이지만 크기는 반응형 */}
          <img
            src="/assets/images/popper-left.png"
            className="w-[40px]  sm:hidden"
            alt="popper-right"
          />
        </div>

        <div className="p-10 flex flex-col sm:flex-row sm:p-3 gap-10 sm:gap-20">
          {/* 카드 영역 */}
          <div className="w-full sm:w-auto flex justify-center">
            <div className="grid grid-cols-2 grid-rows-2 gap-6 sm:gap-8 place-items-center">
              {results.map((poll, idx) => (
                <div
                  key={poll.pollId}
                  className={`w-full ${!isMobile && idx % 2 === 1 ? 'mt-5' : ''}`}
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

          {/* 댓글 */}
          <div
            className={`flex-1  w-full h-[500px] border border-gray-300 rounded-2xl flex justify-center ${
              comments.length === 0 ? 'items-center' : 'items-start'
            } px-4 py-2 overflow-y-auto`}
          >
            {comments.length === 0 ? (
              <div className="pl-10 w-full">
                <CharacterCard />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 w-full">
                {comments.map((comment, idx) => (
                  <CommentCard
                    key={idx}
                    nickname={comment.random_nickname}
                    comment={comment.comment_text}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
