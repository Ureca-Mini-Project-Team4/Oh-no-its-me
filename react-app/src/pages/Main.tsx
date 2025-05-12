import { getPoll } from '@/apis/poll/getPoll';
import Button from '@/components/Button/Button';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [endTime, setEndTime] = useState(() => new Date());
  const [restTime, setRestTime] = useState(1);

  const changeDateTime = useCallback((diff: number) => {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getPoll();
        if (response[0].endTime) {
          setEndTime(new Date(response[0].endTime));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPoll();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      setRestTime(diff);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const navigation = useNavigate();
  const handleMoveToVote = useCallback(() => {
    navigation('/vote');
  }, [navigation]);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen sm:space-y-20 space-y-8 px-4 text-center">
      <p className="text-[18px] sm:text-[20px] md:text-[28px] font-pb leading-tight">
        투표 결과 발표까지 남은 시간
      </p>
      <p className="text-[32px] sm:text-[48px] md:text-[64px] font-pb">
        {restTime > 0 ? changeDateTime(restTime) : '투표가 종료되었습니다.'}
      </p>
      <p className="text-[32px] sm:text-[48px] md:text-[72px] font-pb leading-none">
        <span className="bg-[var(--color-primary-base)] px-2">너로</span> 정했다!
      </p>
      <div className="w-full max-w-[320px] text-[16px] sm:text-[20px] md:text-[24px] font-pb">
        <Button onClick={handleMoveToVote} label="투표하기" disabled={restTime <= 0} />
      </div>
    </div>
  );
};

export default Main;
