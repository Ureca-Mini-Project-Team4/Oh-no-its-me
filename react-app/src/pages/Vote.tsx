import Process from '@/components/Process/Process';
import Candidate from '@/components/Candidate/Candidate';
import Button from '@/components/Button/Button';
import { useState } from 'react';
import useIsMobile from '@/hook/useIsMobile';

const Vote = () => {
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, 4));
  };

  return (
    <div className="min-h-screen bg-white flex items-center flex-col justify-center p-5">
      <div>
        <Process page={page} />
      </div>
      {isMobile ? (
        <div className="">
          <div className="flex flex-col p-5 ">
            <div className="p-2">
              <div className="flex flex-col items-center justify-center font-ps text-lg text-center mb-10">
                <p>무인도에서 가장 탈출 못할 것 같은 사람은?</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
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
          <div className="flex justify-between items-center w-full p-5">
            <Button label="이전" onClick={handlePrev} type="outline" size="sm"></Button>
            <Button label="다음" onClick={handleNext} size="sm"></Button>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className="flex flex-col bg-gray-50 p-5 rounded-[30px] sm:flex-row">
            <div className="flex flex-1 p-10">
              <div className="flex flex-col items-center justify-center gap-10 font-ps text-2xl text-center ">
                <p>무인도에서 가장 탈출 못할 것 같은 사람은?</p>
                <img src="/public/assets/images/question/island.svg" />
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-5">
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
          <div className="flex justify-between items-center w-full mt-10">
            <Button label="이전" onClick={handlePrev} type="outline" size="lg"></Button>
            <Button label="다음" onClick={handleNext} size="lg"></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vote;
