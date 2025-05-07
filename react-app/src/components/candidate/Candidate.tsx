import { useState } from 'react';
import { CandidateProps } from './Candidate.types';

const Candidate = ({ name }: CandidateProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  const isMobile = window.innerWidth <= 768;

  const candidateStyle = {
    width: isMobile ? '115.3px' : '217px',
    height: isMobile ? '148px' : '270px',
    fontSize: isMobile ? '14px' : '20px',
    checkSize: isMobile ? `${148 * 0.1}px` : '24px',
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
              width: candidateStyle.checkSize,
              height: candidateStyle.checkSize,
            }}
          />
        )}

        <img
          src={`/assets/images/people/${name}.png`}
          alt={name}
          style={{
            width: candidateStyle.width,
            height: candidateStyle.height,
          }}
          className="object-cover"
        />
        <span
          className="font-ps"
          style={{ fontSize: candidateStyle.fontSize }}
        >
          {name}
        </span>
      </button>
    </div>
  );
};

export default Candidate;
