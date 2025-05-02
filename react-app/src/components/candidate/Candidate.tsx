import { useState } from 'react';
import { CandidateProps } from './CandidateProps';

const Candidate = ({ name }: CandidateProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
              className="relative pt-1 pb-3 rounded-2xl bg-white flex flex-col items-center border-2 
                        transition-colors ease-in-out hover:cursor-pointer"
        style={{
          borderColor: isSelected
            ? 'var(--color-primary-base)'
            : 'var(--color-gray-200)',
              }}
              
              onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary-base)'
              }}
              onMouseLeave={(e) => {
                  if (!isSelected) {
                      e.currentTarget.style.borderColor ='var(--color-gray-200)'
                  }
              }}
      >
        {isSelected && (
          <img
            className="absolute top-3 right-3"
            src="/assets/icons/check.svg"
            style={{
              width: 'var(--check-size)',
              height: 'var(--check-size)',
            }}
          />
        )}

        <img
          src={`/assets/images/people/${name}.png`}
          alt={name}
          style={{
            width: 'var(--candidate-width)',
            height: 'var(--candidate-height)',
          }}
          className="object-cover"
        />
        <span
          className="font-ps"
          style={{ fontSize: 'var(--candidate-font-size)' }}
        >
          {name}
        </span>
      </button>
    </div>
  );
};

export default Candidate;
