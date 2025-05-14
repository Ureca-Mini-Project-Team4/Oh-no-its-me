import { useState, useEffect } from 'react';
import Confetti from '@/components/Confetti/Confetti';
import Winner from '@/components/Winner/Winner';
import { getLatestPollIds } from '@/apis/poll/getPollLatest';
import { getVoteResultByPollId } from '@/apis/vote/getVoteResultByPollId';
import useIsMobile from '@/hook/useIsMobile';
import { useToast } from '@/hook/useToast';

const Result = () => {
  const isMobile = useIsMobile();
  const [results, setResults] = useState<
    { pollId: number; questionText: string; username: string; voteCount: number }[]
  >([]);
  const [error, setError] = useState(false);
  const { showToast } = useToast();

  if (error) showToast('dd', 'warning');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestPollIds = await getLatestPollIds();
        const resultData = await Promise.all(
          latestPollIds.map(async (pollId) => {
            const result = await getVoteResultByPollId({ pollId });
            const topResult = result.results[0];
            return {
              pollId,
              questionText: result.questionText,
              username: topResult?.username ?? '',
              voteCount: topResult?.voteCount ?? 0,
            };
          }),
        );
        setResults(resultData);
      } catch (err) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* 배경 이미지 */}
      <picture className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <source media="(max-width: 768px)" srcSet="/assets/images/bg-m.png" />
        <img src="/assets/images/bg.svg" alt="background" className="w-full h-auto" />
      </picture>

      <div className="relative z-10 w-full h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-end w-full max-w-[1280px]  gap-10">
          {results.length === 0 && !error && <p className="text-gray-400">아직 결과가 없어요!</p>}

          <Confetti />

          <div className="relative w-full max-w-[1280px] h-[600px] sm:h-[900px] flex flex-col items-center justify-center gap-10">
            {/* title */}
            <div className="flex flex-row items-center justify-center">
              <img
                src="/assets/images/popper-left.png"
                alt="popper"
                className="w-10 sm:w-15 h-auto"
              />
              <h1 className="font-pb text-2xl text-black mx-4">너로 정했다!</h1>
              <img
                src="/assets/images/popper-right.png"
                alt="popper"
                className="w-10 sm:w-15 h-auto"
              />
            </div>

            {/* Winner */}
            {isMobile ? (
              <div className="grid grid-cols-2 grid-rows-2 gap-8 transform">
                {results.slice(0, 4).map((data, index) => {
                  const shift = index % 2 === 0 ? '-translate-y-8' : 'translate-y-8';
                  return (
                    <div key={data.pollId} className={`w-full flex justify-center ${shift}`}>
                      <div className="w-44">
                        <Winner name={data.username} question={data.questionText} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="relative w-full h-[500px] mt-4">
                {results.slice(0, 4).map((data, index) => {
                  const positions = [
                    'top-[0%] left-1/2 -translate-x-1/2', // 위
                    'top-1/2 left-[5%] -translate-y-1/2', // 왼쪽
                    'bottom-[0%] left-1/2 -translate-x-1/2', // 아래
                    'top-1/2 right-[5%] -translate-y-1/2', // 오른쪽
                  ];
                  return (
                    <div key={data.pollId} className={`absolute ${positions[index]} w-auto`}>
                      <Winner name={data.username} question={data.questionText} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
