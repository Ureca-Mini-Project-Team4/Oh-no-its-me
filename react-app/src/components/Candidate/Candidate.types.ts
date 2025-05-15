export interface CandidateProps {
  name: string;
  isSelected: boolean;
  handleClick: (id: number) => void;
  id: number;
}

export interface Candidate {
  id: number;
  userName: string;
}

export interface CandidateGroupProps {
  candidateArr: Candidate[];
  selectedCandidateId: number | null;
  onSelect: (candidateId: number) => void;
}