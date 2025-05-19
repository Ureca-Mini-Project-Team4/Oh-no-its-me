import Button from '@/components/Button/Button';
import FloatingBackground from '@/components/FloatingBackground/FloatingBackground';
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
    <div className="flex flex-col justify-center items-center h-full px-4 text-center relative">
      <FloatingBackground />
      <div className="flex flex-col justify-center gap-6">
        <p className="text-base sm:text-lg md:text-xl text-gray-600 font-pb">
          {restTime > 0 ? '투표 결과 발표까지 남은 시간' : '투표 집계가 완료되었습니다.'}
        </p>
        <p
          className={`${
            restTime > 0
              ? 'text-gray-600'
              : 'bg-gradient-to-r from-red-500 to-lime-300 bg-clip-text text-transparent'
          } text-3xl sm:text-4xl md:text-5xl font-pb`}
        >
          {restTime > 0 ? changeDateTime(restTime) : '결과 발표'}
        </p>
        <p className="mt-4 text-3xl sm:text-5xl md:text-6xl font-pb leading-none">
          <span className="bg-[var(--color-primary-base)] px-2">너로</span> 정했다!
        </p>
      </div>
      <div className="w-full max-w-xs text-base sm:text-lg md:text-xl font-pb mt-10">
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
