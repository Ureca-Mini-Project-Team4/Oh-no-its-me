import { useState} from 'react';
import useVoteData from './useVoteData';
import useVoteSubmit from './useVoteSubmit';

export const useVote = () => {
  const { pollData, pollIds } = useVoteData();
  const { isSubmitting, isModalOpen, setIsModalOpen, handleSubmit } = useVoteSubmit();
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedCandidates, setSelectedCandidates] = useState<{ [pollId: number]: number | null }>(
    {},
  );

  const handleSelect = (pollId: number, candidateId: number) => {
    setSelectedCandidates((prev) => ({ ...prev, [pollId]: candidateId }));
  };

  return {
    pollData,
    pollIds,
    pageIndex,
    setPageIndex,
    selectedCandidates,
    handleSelect,
    isSubmitting,
    isModalOpen,
    setIsModalOpen,
    handleSubmit: () => handleSubmit(selectedCandidates),
  };
};
