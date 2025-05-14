import WinnerCard from '@/components/WinnerCard/WinnerCard';

import {
  getVoteResultByPollId,
  getVoteResultByPollIdResponse,
} from './../apis/vote/getVoteResultByPollId';
import { useEffect, useState } from 'react';
import { getLastestPollIdsResponse, getLatestPollIds } from '@/apis/poll/getPollLatest';
import { CommentResponse } from '@/apis/comment/getComment';
import { getComments } from '@/apis/comment/getAllComments';
import CommentCard from '@/components/Comment/Comment';
import CharacterCard from '@/components/Character/Character';

const Comment = () => {
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

        const res = await Promise.all(
          pollIds.map((poll) => getVoteResultByPollId({ pollId: poll.pollId })),
        );
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
      <div className="p-5 flex flex-col justify-center items-center">
        {/* 제목*/}
        <div className="flex justify-center items-center gap-7">
          <img src="/assets/images/popper-right.png" />
          <h1 className="text-3xl font-pm">투표 결과</h1>
        </div>

        <div className="flex p-5">
          {/* 카드 */}

          <div className="grid grid-cols-2 gap-10">
            {results.map((poll, idx) => (
              <div key={poll.pollId} className={idx % 2 === 1 ? 'mt-10' : ''}>
                <WinnerCard
                  key={poll.pollId}
                  text={poll.questionText}
                  name={poll.results[0].username}
                  num={idx}
                  icon={poll.icon}
                />
              </div>
            ))}
          </div>
          {/* 댓글 */}
          <div className="border border-gray-300 rounded-2xl sm:w-120 sm:h-130 flex justify-center items-center pl-15 pb-10">
            {comments.length === 0 ? (
              <CharacterCard />
            ) : (
              <div className="flex flex-col items-center pt-4 gap-2 w-full">
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
