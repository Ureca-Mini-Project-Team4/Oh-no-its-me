import Process from '@/components/Process/Process';
import Button from '@/components/Button/Button';
import CandidateGroup from '@/components/Candidate/CandidateGroup';
import Modal from '@/components/Modal/Modal';
import Loading from '@/components/Loading/Loading';
import { useToast } from '@/hook/useToast';
import { useEffect, useState } from 'react';
import useIsMobile from '@/hook/useIsMobile';
import { useNavigate } from 'react-router-dom';
import {
  getCandidateLatests,
  getCandidateLatestResponse,
} from '@/apis/candidate/getCandidateLatest';
import { ICONS } from '@/constants/iconPath';
import { updateVoteCount } from '@/apis/vote/updateVoteCount';
import { postVoteResult } from '@/apis/vote/postVoteResult';
import { AxiosError } from 'axios';

const Vote = () => {
  const userId = Number(localStorage.getItem('userId'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pollData, setPollData] = useState<{ [pollId: number]: getCandidateLatestResponse[] }>({});
  const [pollIds, setPollIds] = useState<number[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<{ [pollId: number]: number | null }>(
    {},
  );
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { showToast } = useToast();

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

        const ids: number[] = Object.keys(groupedData)
          .map(Number)
          .sort((a, b) => a - b);

        setPollData(groupedData);
        setPollIds(ids);
        setPageIndex(0);
      } catch (error) {
        navigate('/main');
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            showToast(error.message, 'warning');
          } else {
            const message =
              typeof error.response?.data === 'string'
                ? error.response.data
                : JSON.stringify(error.response?.data);

            showToast(message, 'warning');
          }
        } else {
          showToast(String(error), 'warning');
        }
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handlePrev = () => {
    setPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleMain = () => {
    navigate('/main');
  };

  const handleNext = () => {
    setPageIndex((prev) => Math.min(prev + 1, pollIds.length - 1));
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);

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
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          showToast(error.message, 'warning');
        } else {
          const message =
            typeof error.response?.data === 'string'
              ? error.response.data
              : JSON.stringify(error.response?.data);

          showToast(message, 'warning');
        }
      } else {
        showToast(String(error), 'warning');
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCandidateSelect = (pollId: number, candidateId: number) => {
    setSelectedCandidates((prev) => ({ ...prev, [pollId]: candidateId }));
  };

  if (pollIds.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  const currentPollId = pollIds[pageIndex];
  const currentCandidates = pollData[currentPollId];
  const questionText = currentCandidates[0]?.questionText;
  const icon = currentCandidates[0]?.icon;

  const selectedCandidateId = selectedCandidates[currentPollId] ?? null;
  const isCandidateSelected = selectedCandidateId !== null;

  return (
    <div className="h-fit bg-white flex items-center flex-col justify-center p-5">
      <div>
        <Process page={pageIndex + 1} />
      </div>
      {isMobile ? (
        <div>
          <div className="flex flex-col p-5">
            <div className="flex flex-col items-center justify-center font-ps text-sm text-center p-2 max-h-[150px]">
              <p className="break-all">{questionText}</p>
              <img
                src={ICONS.QUESTION_ICON(icon)}
                className="w-full max-w-[90px] h-full object-contain p-2 mt-2"
                alt="question icon"
              />
            </div>
            <div className="flex flex-col items-center justify-center max-w-[300px] min-w-[150px]">
              <CandidateGroup
                candidateArr={currentCandidates.map((c) => ({
                  id: c.candidateId,
                  userName: c.userName,
                }))}
                selectedCandidateId={selectedCandidateId}
                onSelect={(candidateId) => handleCandidateSelect(currentPollId, candidateId)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full p-5">
            {pageIndex > 0 ? (
              <Button label="이전" onClick={handlePrev} type="outline" size="sm" />
            ) : (
              <Button label="이전" onClick={handleMain} type="outline" size="sm" />
            )}

            {pageIndex < pollIds.length - 1 ? (
              <Button label="다음" onClick={handleNext} size="sm" disabled={!isCandidateSelected} />
            ) : (
              <Button
                label="제출"
                onClick={() => setIsModalOpen(true)}
                size="sm"
                disabled={!isCandidateSelected}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="pt-5 max-w-[850px]">
          <div className="grid grid-cols-2 gap-5 items-center justify-center bg-gray-50 p-5 rounded-[30px]">
            <div className="grid-cols-1 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-10 font-ps text-xl text-center ">
                <p className="break-keep">{questionText}</p>
                <img
                  src={ICONS.QUESTION_ICON(icon)}
                  className="w-full max-w-[200px] h-full object-contain"
                  alt="question icon"
                />
              </div>
            </div>
            <div className="flex-1 flex-col items-center justify-center p-5">
              <CandidateGroup
                candidateArr={currentCandidates.map((c) => ({
                  id: c.candidateId,
                  userName: c.userName,
                }))}
                selectedCandidateId={selectedCandidateId}
                onSelect={(candidateId) => handleCandidateSelect(currentPollId, candidateId)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-5">
            {pageIndex > 0 ? (
              <Button label="이전" onClick={handlePrev} type="outline" size="lg" />
            ) : (
              <Button label="이전" onClick={handleMain} type="outline" size="lg" />
            )}

            {pageIndex < pollIds.length - 1 ? (
              <Button label="다음" onClick={handleNext} size="lg" disabled={!isCandidateSelected} />
            ) : (
              <Button
                label="제출"
                onClick={() => setIsModalOpen(true)}
                size="lg"
                disabled={!isCandidateSelected}
              />
            )}
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={handleConfirm}
        text2="한번 완료하면 다시 투표할 수 없어요"
      />
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Vote;
