import { useCallback, useState } from 'react';
import Candidate from './Candidate';

const selectedArr = [false, false, false, false];

const CandidateGroup = ({ candidateArr }: { candidateArr: string[] }) => {
  const [isSelected, setIsSelected] = useState(selectedArr);

  const handleClick = useCallback((idx: number) => {
    const newSelectedArr = Array(selectedArr.length).fill(false);
    newSelectedArr[idx] = true;
    setIsSelected(newSelectedArr);
  }, []);

  return (
    <div className="w-fit">
      <div className="grid grid-cols-2 gap-[10%]">
        {candidateArr.map((item, idx) => {
          return (
            <Candidate
              key={item}
              name={item}
              handleClick={handleClick}
              isSelected={isSelected[idx]}
              idx={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CandidateGroup;
