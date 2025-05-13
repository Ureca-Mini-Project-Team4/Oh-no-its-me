import WinnerCard from '@/components/WinnerCard/WinnerCard';

import {
  getVoteResultByPollId,
  getVoteResultByPollIdResponse,
} from './../apis/vote/getVoteResultByPollId';
import { useEffect, useState } from 'react';

const Comment = () => {
  const [results, setResults] = useState<getVoteResultByPollIdResponse[]>([]);
  const pollIds = [159, 160, 161, 162];

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const data = await Promise.all(pollIds.map((id) => getVoteResultByPollId({ pollId: id })));
        setResults(data);
      } catch (error) {
        console.error('투표 결과 불러오기 실패 : ', error);
      }
    };
    fetchAllResults();
  }, []);

  return (
    <>
      <div className="p-10 flex flex-col justify-center items-center">
        {/* 제목*/}
        <div className="flex justify-center items-center gap-7">
          <img src="/assets/images/popper-right.png" />
          <h1 className="text-3xl font-pm">투표 결과</h1>
        </div>

        <div className="flex p-10">
          {/* 카드 */}
          <div className="grid grid-cols-2 gap-10">
            {results.map((result, idx) => (
              <div key={result.pollId} className={idx % 2 === 1 ? 'mt-10' : ''}>
                <WinnerCard
                  key={result.pollId}
                  text={result.questionText}
                  name={result.results[0].username}
                  num={idx}
                  icon={result.icon}
                />
              </div>
            ))}
          </div>

          {/* 댓글 */}
          <div>댓글</div>
        </div>
      </div>
    </>
  );
};

export default Comment;
