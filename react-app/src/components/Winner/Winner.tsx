import { WinnerProps } from './Winner.types';
import { IMAGES } from '@/constants/imagePath';

const Winner = ({ name, question }: WinnerProps) => {
  const imageSrc = `${IMAGES.WINNER_BASE}/${encodeURIComponent(name)}.png`;

  return (
    <div className="relative flex flex-col items-center w-[160px] h-[95px] md:w-[360px] md:h-[200px] mt-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[25px] md:-translate-y-[50px] w-[95px] h-[95px] md:w-[160px] md:h-[160px] z-10">
        <img src={imageSrc} alt={`${name} 프사`} className="w-full h-full object-cover" />
      </div>
      <div className="mt-[50px] md:mt-[80px] w-full h-24 md:h-36 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center pt-[33px] md:pt-[35px] pb-4 md:pb-3 md:px-2">
        <p className="text-center text-[10px] md:text-[16px] font-pm leading-tight whitespace-pre-wrap px-3">
          {question}
        </p>
        <div className="mt-1 text-[14px] md:text-[20px] font-pm text-[var(--color-primary-base)]">
          {name}
        </div>
      </div>
    </div>
  );
};

export default Winner;
