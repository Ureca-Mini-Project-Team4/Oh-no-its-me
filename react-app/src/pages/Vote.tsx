import Process from '@/components/Process/Process';
import Candidate from '@/components/Candidate/Candidate';
import Button from '@/components/Button/Button';
import { useState } from 'react';
const Vote = () => {
  const [page, setPage] = useState(1);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white flex items-center flex-col justify-center p-15">
      <div>
        <Process page={page} />
      </div>
      <div className="p-10">
        <div className="flex flex-row bg-gray-50 p-5 rounded-[30px]">
          <div className="p-30">
            <div className="flex flex-col items-center justify-center gap-10 font-ps text-3xl text-center">
              <p>무인도에서 가장 탈출 못할 것 같은 사람은?</p>
              <img src="/public/assets/images/question/island.svg" />
            </div>
          </div>
          <div>
            <div className="flex flex-row">
              <Candidate name="이영주"></Candidate>
              <Candidate name="박은서"></Candidate>
            </div>
            <div className="flex flex-row">
              <Candidate name="진영호"></Candidate>
              <Candidate name="이다예"></Candidate>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full p-10">
          <Button label="이전" onClick={handlePrev} type="outline" size="lg"></Button>
          <Button label="이후" onClick={handleNext} size="lg"></Button>
        </div>
      </div>
    </div>
  );
};

export default Vote;
