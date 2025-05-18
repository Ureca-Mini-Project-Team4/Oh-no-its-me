import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCandidateLatests,
  getCandidateLatestResponse,
} from '@/apis/candidate/getCandidateLatest';
import { updateVoteCount } from '@/apis/vote/updateVoteCount';
import { postVoteResult } from '@/apis/vote/postVoteResult';
import { useToast } from '@/hook/useToast';
import { AxiosError } from 'axios';

export const useVote = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [pollData, setPollData] = useState<{ [pollId: number]: getCandidateLatestResponse[] }>({});
  const [pollIds, setPollIds] = useState<number[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<{ [pollId: number]: number | null }>(
    {},
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCandidateLatests();
        const groupedData: { [pollId: number]: getCandidateLatestResponse[] } = {};

        data.forEach((item) => {
          if (!groupedData[item.pollId]) {
            groupedData[item.pollId] = [];
          }
          groupedData[item.pollId].push(item);
        });

        const ids = Object.keys(groupedData)
          .map(Number)
          .sort((a, b) => a - b);
        setPollData(groupedData);
        setPollIds(ids);
        setPageIndex(0);
      } catch (error) {
        navigate('/main');
        if (error instanceof AxiosError) {
          const message =
            typeof error.response?.data === 'string'
              ? error.response.data
              : JSON.stringify(error.response?.data);
          showToast(message, 'warning');
        } else {
          showToast(String(error), 'warning');
        }
      }
    }

    fetchData();
  }, []);

  const handleSelect = (pollId: number, candidateId: number) => {
    setSelectedCandidates((prev) => ({ ...prev, [pollId]: candidateId }));
  };

  const handleSubmit = async () => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      navigate('/');
      showToast('로그인이 필요합니다.', 'warning');
      return;
    }

    const voteResults = Object.entries(selectedCandidates).map(([pollId, candidateId]) => ({
      pollId: Number(pollId),
      candidateId: candidateId!,
    }));

    try {
      setIsSubmitting(true);
      await Promise.all(voteResults.map(updateVoteCount));
      await postVoteResult({ userId });
      localStorage.setItem('voted', 'true');
      navigate('/main');
      showToast('투표가 성공적으로 완료되었습니다.', 'success');
    } catch (error) {
      navigate('/main');
      const message =
        error instanceof AxiosError
          ? typeof error.response?.data === 'string'
            ? error.response.data
            : JSON.stringify(error.response?.data)
          : String(error);
      showToast(message, 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    pollData,
    pollIds,
    pageIndex,
    setPageIndex,
    isSubmitting,
    isModalOpen,
    setIsModalOpen,
    selectedCandidates,
    handleSelect,
    handleSubmit,
  };
};
