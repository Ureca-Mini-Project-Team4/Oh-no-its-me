import Confetti from '@/components/Confetti/Confetti';

const Result = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* 컨페티 애니메이션 */}
      <Confetti />

      {/* 배경 이미지 */}
      <picture className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <source media="(max-width: 768px)" srcSet="/assets/images/bg-m.png" />
        <img src="/assets/images/bg.svg" alt="background" className="w-full h-auto" />
      </picture>

      {/* 콘텐츠 */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* 타이틀 */}
        <div className="flex flex-row items-center justify-center mb-6">
          <img src="/assets/images/popper-left.png" alt="popper" className="w-10 sm:w-15 h-auto" />
          <h1 className="font-pb text-2xl text-black mx-4">너로 정했다!</h1>
          <img src="/assets/images/popper-right.png" alt="popper" className="w-10 sm:w-15 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Result;
