import Process from '@/components/Process/Process';
import Button from '@/components/Button/Button';
import CandidateGroup from '@/components/Candidate/CandidateGroup';
import Modal from '@/components/Modal/Modal';
import Loading from '@/components/Loading/Loading';
import { useMediaQuery } from 'react-responsive';
import { ICONS } from '@/constants/iconPath';
import { useVote } from '@/hook/useVote';

const Vote = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const {
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
  } = useVote();

  if (!pollIds.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  const handlePrev = () => setPageIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setPageIndex((prev) => Math.min(prev + 1, pollIds.length - 1));

  return (
    <div className="min-h-screen bg-white flex items-center flex-col justify-center p-5">
      <Process page={pageIndex + 1} />

      {isMobile ? (
        <div className="flex flex-col p-5">
          <div className="flex flex-col items-center justify-center font-ps text-sm text-center p-2 min-w-[270px] min-h-[150px] max-h-[150px]">
            <p className="break-all">{questionText}</p>
            <img
              src={ICONS.QUESTION_ICON(icon)}
              className="w-full max-w-[90px] h-full object-contain p-2 mt-2"
              alt="question icon"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <CandidateGroup
              candidateArr={currentCandidates.map((c) => ({
                id: c.candidateId,
                userName: c.userName,
              }))}
              selectedCandidateId={selectedCandidateId}
              onSelect={(id) => handleSelect(currentPollId, id)}
            />
          </div>
          <div className="flex justify-between items-center w-full p-5">
            {pageIndex > 0 ? (
              <Button label="이전" onClick={handlePrev} type="outline" size="sm" />
            ) : (
              <Button label="이전" onClick={() => setPageIndex(0)} type="outline" size="sm" />
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
          <div className="flex flex-col items-center justify-center bg-gray-50 p-5 rounded-[30px] sm:flex-row min-h-[400px] min-w-[1030px]">
            <div className="flex flex-1 p-13 min-h-[400px] min-w-[500px] items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-10 font-ps text-xl text-center">
                <p className="break-all">{questionText}</p>
                <img
                  src={ICONS.QUESTION_ICON(icon)}
                  className="w-full max-w-[200px] h-full object-contain"
                  alt="question icon"
                />
              </div>
            </div>
            <div className="flex-1 flex-col items-center justify-center p-10">
              <CandidateGroup
                candidateArr={currentCandidates.map((c) => ({
                  id: c.candidateId,
                  userName: c.userName,
                }))}
                selectedCandidateId={selectedCandidateId}
                onSelect={(id) => handleSelect(currentPollId, id)}
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-10">
            {pageIndex > 0 ? (
              <Button label="이전" onClick={handlePrev} type="outline" size="lg" />
            ) : (
              <Button label="이전" onClick={() => setPageIndex(0)} type="outline" size="lg" />
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
        onConfirm={handleSubmit}
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
