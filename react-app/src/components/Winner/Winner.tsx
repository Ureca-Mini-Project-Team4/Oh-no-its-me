import { WinnerProps } from './Winner.types';
const BASE_URL = '/assets/images/people';

const Winner = ({ name, question }: WinnerProps) => {
  return (
    <div className="w-[160px] h-[95px] sm:w-[360px] sm:h-[200px] relative flex flex-col items-center">
      {/* 이미지 */}
      <div className="w-[95px] h-[95px] sm:w-[180px] sm:h-[160px] absolute -top-[15px] sm:-top-[50px] left-1/2 -translate-x-1/2 z-10">
        <img
          alt="Winner Img"
          src={`${BASE_URL}/${name}.png`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 박스 */}
      <div className="shadow-xl w-full h-24 sm:h-36 bg-white rounded-xl flex flex-col justify-center items-center pt-[33px] pb-4 sm:pt-[35px] sm:px-2 sm:pb-3 mt-[44px] sm:mt-[80px]">
        <p className="text-center text-[10px] sm:text-[16px] whitespace-pre-wrap pl-3 pr-3 leading-tight font-pm">
          {question}
        </p>
        <div className="mt-1 text-[14px] sm:text-[20px] font-pm text-[var(--color-primary-base)]">
          {name}
        </div>
      </div>
    </div>
  );
};

export default Winner;
