import { WinnerProps } from './Winner.types';

const Winner = ({ name, question }: WinnerProps) => {
  return (
    <div className="w-[180px] h-[95px] sm:w-[340px] sm:h-[200px] relative flex flex-col items-center">
      {/* 이미지 */}
      <div className="w-[95px] h-[95px] sm:w-[190px] sm:h-[190px] absolute -top-[35px] sm:-top-[90px] left-1/2 -translate-x-1/2 z-10">
        <img
          alt="Winner Img"
          src={`/assets/images/people/${name}.png`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 박스 */}
      <div className="shadow-xl w-full h-full bg-white rounded-xl flex flex-col justify-center items-center pt-[33px] pb-4 sm:pt-[35px] sm:px-4 sm:pb-6 mt-[44px] sm:mt-[80px]">
        <p className="text-center text-[10px] sm:text-[18px] whitespace-pre-wrap break-keep leading-tight font-pm">
          {question}
        </p>
        <div className="mt-1 text-[15px] sm:text-[30px] font-pm text-[var(--color-primary-base)]">
          {name}
        </div>
      </div>
    </div>
  );
};

export default Winner;
