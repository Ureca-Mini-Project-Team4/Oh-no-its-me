import Candidate from './Candidate';
import { CandidateGroupProps } from './Candidate.types';

const CandidateGroup = ({ candidateArr, selectedCandidateId, onSelect }: CandidateGroupProps) => {
  return (
    <div className="w-fit">
      <div className="grid grid-cols-2 grid-rows-2 gap-5">
        {candidateArr.map((candidate) => (
          <Candidate
            key={candidate.id}
            name={candidate.userName}
            isSelected={selectedCandidateId === candidate.id}
            handleClick={() => onSelect(candidate.id)}
            id={candidate.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidateGroup;


