import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '@/hook/useIsMobile';

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClickButton = () => {
    navigate('login');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <picture className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <source media="(max-width: 768px)" srcSet="/assets/images/bg-m.png" />
        <img src="/assets/images/bg.svg" alt="background" className="w-full h-auto" />
      </picture>
      {isMobile ? (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="font-pb text-2xl text-black mx-4">우리끼리 하는 투표 게임</h1>
            <h1 className="font-pb text-2xl text-[var(--color-primary-base)] mx-4">너로 정했다!</h1>
            <p className="font-pr text-gray-500">유레카 프론트엔드 대면반 전용 게임</p>
            <div className="px-6">
              <img src="/assets/images/mockup.png" alt="mockup" className="w-64 h-auto" />
              <Button label="로그인하고 시작하기" onClick={handleClickButton} />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-auto h-full flex flex-row items-center justify-center lg:gap-x-30 gap-x-12 px-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-8 transform">
            <img
              src="/assets/images/main1.png"
              alt="main"
              className="w-52 h-auto sm:w-56 translate-y-[-12px]"
            />
            <img
              src="/assets/images/main2.png"
              alt="main"
              className="w-52 h-auto sm:w-56 translate-y-[12px]"
            />
            <img
              src="/assets/images/main3.png"
              alt="main"
              className="w-52 h-auto sm:w-56 translate-y-[-12px]"
            />
            <img
              src="/assets/images/main4.png"
              alt="main"
              className="w-52 h-auto sm:w-56 translate-y-[12px]"
            />
          </div>
          <div className="w-[432px] space-y-5 text-left">
            <h1 className="font-pb text-4xl text-black">우리끼리 하는 투표 게임</h1>
            <h1 className="font-pb text-4xl text-[var(--color-primary-base)]">너로 정했다!</h1>
            <p className="font-pr text-2xl text-gray-600 mb-6">
              유레카 프론트엔드 대면반 전용 게임
            </p>
            <Button label="로그인하고 시작하기" onClick={handleClickButton} size="full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
