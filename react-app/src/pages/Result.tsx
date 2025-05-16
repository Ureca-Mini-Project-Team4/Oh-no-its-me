import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoteResults } from '@/hook/useVoteResults';
import useIsMobile from '@/hook/useIsMobile';
import { useToast } from '@/hook/useToast';
import axios from 'axios';
import Confetti from '@/components/Confetti/Confetti';
import Winner from '@/components/Winner/Winner';
import Loading from '@/components/Loading/Loading';

const Result = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { showToast } = useToast();
  const [isTimedOut, setIsTimedOut] = useState(false);

  const { data: results, isLoading, isError, error } = useVoteResults();

  useEffect(() => {
    const timeout = setTimeout(() => setIsTimedOut(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isError && error instanceof Error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 500) {
          showToast('서버에 연결할 수 없습니다.', 'warning');
          navigate('/main');
        } else if (status === 401) {
          showToast('권한이 없습니다. 로그인 후 다시 시도해주세요.', 'warning');
          navigate('/login');
        } else if (status === 404) {
          showToast('요청하신 데이터를 찾을 수 없습니다.', 'warning');
          navigate('/main');
        } else {
          showToast('알 수 없는 오류가 발생했습니다.', 'warning');
          navigate('/main');
        }
      } else {
        showToast('서버에 연결할 수 없습니다.', 'warning');
        navigate('/main');
      }
    }
  }, [isError, error, showToast]);

  const handleClickButton = () => {
    navigate('/comment');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <picture className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <source media="(max-width: 768px)" srcSet="/assets/images/bg-m.png" />
        <img src="/assets/images/bg.svg" alt="background" className="w-full h-auto" />
      </picture>

      <div className="relative z-10 w-full h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-end w-full max-w-[1280px] gap-10">
          {isLoading ? (
            isTimedOut ? (
              <p className="font-pm text-gray-400">아직 결과가 없어요!</p>
            ) : (
              <Loading />
            )
          ) : isError ? (
            <p className="font-pm text-red-500">결과를 불러오는 데 실패했습니다.</p>
          ) : null}

          {!isLoading && results && results.length > 0 && <Confetti />}

          {!isLoading && results && results.length > 0 && (
            <div className="relative w-full max-w-[1280px] h-[600px] sm:h-[900px] flex flex-col items-center justify-center gap-10">
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

              {isMobile ? (
                <div className="grid grid-cols-2 grid-rows-2 gap-8 transform">
                  {results.slice(0, 4).map((data, index) => {
                    const shift = index % 2 === 0 ? '-translate-y-8' : 'translate-y-8';
                    return (
                      <div
                        key={data.pollId}
                        className={`w-full flex justify-center ${shift} relative`}
                      >
                        <div className="w-44 relative">
                          <Winner name={data.username} question={data.questionText} />
                          {index === 1 && (
                            <img
                              src="/assets/icons/arrow-right.png"
                              alt="arrow"
                              className="absolute top-1/2 right-2 ml-2 -translate-y-1/2 w-8 h-8 cursor-pointer z-20"
                              onClick={handleClickButton}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="relative w-full h-[500px] mt-4">
                  {results.slice(0, 4).map((data, index) => {
                    const positions = [
                      'top-[0%] left-1/2 -translate-x-1/2',
                      'top-1/2 left-[5%] -translate-y-1/2',
                      'bottom-[0%] left-1/2 -translate-x-1/2',
                      'top-1/2 right-[5%] -translate-y-1/2',
                    ];
                    return (
                      <div key={data.pollId} className={`absolute ${positions[index]} w-auto`}>
                        <div className="relative">
                          <Winner name={data.username} question={data.questionText} />
                          {index === 3 && (
                            <img
                              src="/assets/icons/arrow-right.png"
                              alt="arrow"
                              className="absolute top-1/2 left-full ml-6 -translate-y-1/2 w-10 h-10 cursor-pointer z-20"
                              onClick={handleClickButton}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
