import { useState } from 'react';
import { CandidateProps } from './Candidate.types';

const Candidate = ({ name }: CandidateProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="p-2 sm:p-5">
      <button
        onClick={handleButtonClick}
        className={`relative pt-1 pb-3 rounded-2xl bg-white flex flex-col items-center border-2 
    transition-colors ease-in-out hover:cursor-pointer 
    ${isSelected ? 'border-[var(--color-primary-base)] hover:border-[var(--color-primary-base)]' : 'border-[var(--color-gray-200)] hover:border-[var(--color-primary-base)]'}`}
      >
        {isSelected && (
          <img
            className={'absolute top-3 right-3 w-[14.8px] h-[14.8px] sm:w-[24px] sm:h-[24px]'}
            src="/assets/icons/check.svg"
            alt="선택됨"
          />
        )}

        <img
          src={`/assets/images/people/${name}.png`}
          alt={name}
          className={'object-cover w-[120px] h-[120px] sm:w-[160px] sm:h-[160px]'}
        />

        <span className={'font-ps text-[14px] sm:text-[24px]'}>{name}</span>
      </button>
    </div>
  );
};

export default Candidate;
