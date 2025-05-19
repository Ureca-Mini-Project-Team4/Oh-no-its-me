import { CandidateProps } from './Candidate.types';
import { IMAGES } from '@/constants/imagePath';
import { ICONS } from '@/constants/iconPath';

const Candidate = ({ name, isSelected, handleClick, id }: CandidateProps) => {
  return (
    <div>
      <button
        onClick={() => handleClick(id)}
        className={`relative pt-1 pb-3 rounded-2xl bg-white flex flex-col items-center border-2 
          transition-colors ease-in-out hover:cursor-pointer 
          ${
            isSelected
              ? 'border-[var(--color-primary-base)] hover:border-[var(--color-primary-base)]'
              : 'border-[var(--color-gray-200)] hover:border-[var(--color-primary-base)]'
          }`}
      >
        {isSelected && (
          <img
            className="absolute top-3 right-3 w-[14.8px] h-[14.8px] md:w-[24px] md:h-[24px]"
            src={ICONS.CHECK}
            alt="selected"
          />
        )}
        <img
          src={IMAGES.PEOPLE(name)}
          alt={name}
          className="object-cover w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
        />
        <span className="font-ps text-[14px] md:text-[20px]">{name}</span>
      </button>
    </div>
  );
};

export default Candidate;
