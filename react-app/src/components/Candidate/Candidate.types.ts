export interface CandidateProps {
  name: string;
  isSelected: boolean;
  handleClick: (idx: number) => void;
  idx: number;
}
