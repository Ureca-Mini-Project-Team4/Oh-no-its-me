import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useVoteResults } from '@/hook/useVoteResults';
import { useToast } from '@/hook/useToast';
import { IMAGES } from '@/constants/imagePath';
import Confetti from '@/components/Confetti/Confetti';
import Winner from '@/components/Winner/Winner';
import Loading from '@/components/Loading/Loading';

const Result = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isTimedOut, setIsTimedOut] = useState(false);
  const { data: results, isLoading, isError, error } = useVoteResults();

  useEffect(() => {
    const timeout = setTimeout(() => setIsTimedOut(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isError || !(error instanceof Error)) return;
    const status = axios.isAxiosError(error) ? error.response?.status : null;
    const message =
      status === 500
        ? '서버에 연결할 수 없습니다.'
        : status === 401
          ? '권한이 없습니다. 로그인 후 다시 시도해주세요.'
          : status === 404
            ? '요청하신 데이터를 찾을 수 없습니다.'
            : '알 수 없는 오류가 발생했습니다.';
    showToast(message, 'warning');
    navigate(status === 401 ? '/login' : '/main');
  }, [isError, error, showToast, navigate]);

  const handleClickButton = () => navigate('/comment');

  const hasResults = results && results.length > 0;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <picture className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <source media="(max-width: 768px)" srcSet={IMAGES.BG_MOBILE} />
        <img src={IMAGES.BG} alt="background" className="w-full h-auto" />
      </picture>

      <div className="relative z-10 w-full h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center justify-end w-full max-w-[1280px] gap-10">
          {isLoading && !isTimedOut && <Loading />}

          {isLoading && isTimedOut && <p className="font-pm text-gray-400">아직 결과가 없어요!</p>}

          {isError && <p className="font-pm text-red-500">결과를 불러오는 데 실패했습니다.</p>}

          {hasResults && <Confetti />}

          {hasResults && (
            <div className="relative w-full max-w-[1280px] h-[600px] sm:h-[900px] flex flex-col items-center justify-center gap-10">
              <div className="flex items-center justify-center pb-20">
                <img src={IMAGES.POPPER_LEFT} alt="popper" className="w-10 sm:w-15" />
                <h1 className="font-pb text-2xl text-black mx-4 whitespace-nowrap">너로 정했다!</h1>
                <img src={IMAGES.POPPER_RIGHT} alt="popper" className="w-10 sm:w-15" />
              </div>
              {isMobile ? (
                <div className="grid grid-cols-2 grid-rows-2 gap-8">
                  {results.slice(0, 4).map((data, index) => {
                    const shift = index % 2 === 0 ? '-translate-y-8' : 'translate-y-8';
                    return (
                      <div
                        key={data.pollId}
                        className={`w-full flex justify-center relative ${shift}`}
                      >
                        <div className="relative w-full max-w-[160px] flex justify-center">
                          <Winner name={data.username} question={data.questionText} />
                          {index === 1 && (
                            <img
                              src={IMAGES.ARROW}
                              alt="arrow"
                              className="absolute top-1/2 right-0 ml-2 -translate-y-1/2 w-8 h-8 cursor-pointer z-20"
                              onClick={handleClickButton}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="relative w-full h-[480px] mt-4 flex items-center justify-center">
                  {results.slice(0, 4).map((data, index) => {
                    const positions = [
                      'absolute top-0 left-1/2 -translate-x-1/2',
                      'absolute top-1/2 left-[5%] -translate-y-1/2',
                      'absolute bottom-0 left-1/2 -translate-x-1/2',
                      'absolute top-1/2 right-[5%] -translate-y-1/2',
                    ];
                    return (
                      <div key={data.pollId} className={`absolute ${positions[index]} w-auto`}>
                        <div className="relative">
                          <Winner name={data.username} question={data.questionText} />
                          {index === 3 && (
                            <img
                              src={IMAGES.ARROW}
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
