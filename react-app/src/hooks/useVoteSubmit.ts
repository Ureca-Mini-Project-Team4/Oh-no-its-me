import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './useToast';
import { updateVoteCount } from '@/apis/vote/updateVoteCount';
import { postVoteResult } from '@/apis/vote/postVoteResult';
import { AxiosError } from 'axios';

const useVoteSubmit = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleSubmit = useCallback(async (selectedCandidates: {[pollId: number]: number | null}) => {
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
  }, [showToast, navigate]);

  return {
    isSubmitting,
    isModalOpen,
    setIsModalOpen,
    handleSubmit,
  };
};

export default useVoteSubmit;