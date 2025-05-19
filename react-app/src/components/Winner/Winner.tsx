import { WinnerProps } from './Winner.types';
import { IMAGES } from '@/constants/imagePath';

const Winner = ({ name, question }: WinnerProps) => {
  const imageSrc = `${IMAGES.WINNER_BASE}/${encodeURIComponent(name)}.png`;

  return (
    <div className="relative flex flex-col items-center w-[200px] break-keep md:w-[280px] mt-4">
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 -translate-y-[25px] md:-translate-y-[50px] w-[100px] h-[100px] md:w-[140px] md:h-[140px] z-10">
        <img src={imageSrc} alt={`${name} 프사`} className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-24 md:h-36 bg-white rounded-xl shadow-xl flex flex-col items-center justify-end pb-3 md:pb-5 md:px-2">
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
