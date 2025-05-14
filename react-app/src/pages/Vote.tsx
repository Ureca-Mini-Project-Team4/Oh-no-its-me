import Process from '@/components/Process/Process';
import Button from '@/components/Button/Button';
import CandidateGroup from '@/components/Candidate/CandidateGroup';
import Modal from '@/components/Modal/Modal';

import { useEffect, useState } from 'react';
import useIsMobile from '@/hook/useIsMobile';
import {
  getCandidateLatests,
  getCandidateLatestResponse,
} from '@/apis/candidate/getCandidateLatest';
import { updateVoteCount } from '@/apis/vote/updateVoteCount';
import { postVoteResult } from '@/apis/vote/postVoteResult';

const Vote = () => {
  const userId = Number(localStorage.getItem('userId'));
  const [pollData, setPollData] = useState<{ [pollId: number]: getCandidateLatestResponse[] }>({});
  const [pollIds, setPollIds] = useState<number[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const [selectedCandidates, setSelectedCandidates] = useState<{ [pollId: number]: number | null }>(
    {},
  );

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, []);

  const handlePrev = () => {
    setPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPageIndex((prev) => Math.min(prev + 1, pollIds.length - 1));
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);

    if (!userId) {
      alert('로그인이 필요합니다.'); // /페이지로 이동
      return;
    }

    const voteResults = Object.entries(selectedCandidates).map(([pollId, candidateId]) => ({
      pollId: Number(pollId),
      candidateId: candidateId!,
    }));

    try {
      await Promise.all(voteResults.map(updateVoteCount));
      await postVoteResult({ userId });
    } catch (err) {
      console.error(err);
      alert('투표 제출 중 오류가 발생했습니다.');
    }
  };

  const handleCandidateSelect = (pollId: number, candidateId: number) => {
    setSelectedCandidates((prev) => ({ ...prev, [pollId]: candidateId }));
  };

  if (pollIds.length === 0) return <div>Loading...</div>; // 메인화면으로 이동하자?

  const currentPollId = pollIds[pageIndex];
  const currentCandidates = pollData[currentPollId];
  const questionText = currentCandidates[0]?.questionText;
  const icon = currentCandidates[0]?.icon;

  const selectedCandidateId = selectedCandidates[currentPollId] ?? null;
  const isCandidateSelected = selectedCandidateId !== null;

  return (
    <div className="min-h-screen bg-white flex items-center flex-col justify-center p-5">
      <div>
        <Process page={currentPollId} />
      </div>
      {isMobile ? (
        <div className="">
          <div className="flex flex-col p-5 ">
            <div className="p-2">
              <div className="flex flex-col items-center justify-center font-ps text-lg text-center mb-10">
                <p>{questionText}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
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
              <Button
                label="이전"
                onClick={handlePrev}
                type="outline"
                size="sm"
                disabled={!isCandidateSelected}
              />
            ) : (
              <div className="w-[188px]" />
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
        <div className="p-5">
          <div className="flex flex-col items-center justify-center bg-gray-50 p-5 rounded-[30px] sm:flex-row">
            <div className="flex flex-1 p-13">
              <div className="flex flex-col items-center justify-center gap-10 font-ps text-2xl text-center ">
                <p>{questionText}</p>
                {icon ? (
                  <img
                    src={icon}
                    className="w-full max-w-[250px] h-full object-contain"
                    alt="question icon"
                  />
                ) : (
                  <img
                    src="/public/assets/images/question/island.svg"
                    className="w-full max-w-[250px] h-full object-contain"
                    alt="default icon"
                  />
                )}
              </div>
            </div>
            <div className="flex-1 flex-col items-center justify-center p-10">
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
          <div className="flex justify-between items-center w-full mt-10">
            {pageIndex > 0 ? (
              <Button
                label="이전"
                onClick={handlePrev}
                type="outline"
                size="lg"
                disabled={!isCandidateSelected}
              />
            ) : (
              <div className="w-[188px]" />
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
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onConfirm={handleConfirm} />
    </div>
  );
};

export default Vote;
