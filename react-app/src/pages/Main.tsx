// import { getLatestPollIds } from '@/apis/poll/getPollLatest';
import Button from '@/components/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [restTime, setRestTime] = useState(10);
  const isVoted = localStorage.getItem('voted') === 'true';

  const changeDateTime = useCallback((diff: number) => {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    const todayAtFour = new Date();
    todayAtFour.setHours(16, 0, 0, 0); // 16시

    const updateTimer = () => {
      const now = new Date().getTime();
      const end = todayAtFour.getTime();
      const diff = end - now;
      setRestTime(diff > 0 ? diff : 0);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigation = useNavigate();

  const handleMoveToVote = useCallback(() => {
    navigation('/vote');
  }, [navigation]);

  const handleMoveToResult = useCallback(() => {
    navigation('/result');
  }, [navigation]);

  return (
    <div className="flex flex-col min-w-[250px] justify-center items-center w-screen h-screen sm:space-y-20 space-y-8 px-4 text-center">
      <div className="flex flex-col justify-center gap-[1.4vw]">
        <p className="text-[18px] text-gray-600 sm:text-[20px] md:text-[28px] font-pb">
          {restTime > 0 ? '투표 결과 발표까지 남은 시간' : '투표 집계가 완료되었습니다.'}
        </p>
        <p
          className={`${restTime > 0 ? 'text-gray-600' : 'bg-gradient-to-r from-red-500 to-lime-300 bg-clip-text text-transparent'} text-[32px] sm:text-[48px] md:text-[64px] font-pb`}
        >
          {restTime > 0 ? changeDateTime(restTime) : '결과 발표'}
        </p>
        <p className="mt-[1vw] text-[32px] sm:text-[48px] md:text-[72px] font-pb leading-none">
          <span className="bg-[var(--color-primary-base)] px-2">너로</span> 정했다!
        </p>
      </div>
      <div className="w-full max-w-[320px] text-[16px] sm:text-[20px] md:text-[24px] font-pb">
        {restTime > 0 ? (
          <Button
            onClick={handleMoveToVote}
            label={isVoted ? '투표완료' : '투표하기'}
            disabled={isVoted}
          />
        ) : (
          <Button onClick={handleMoveToResult} label="결과 확인" />
        )}
      </div>
    </div>
  );
};

export default Main;
