import { RootState } from '@/store';
import Profile from '../Profile/Profile';
import { useSelector } from 'react-redux';
import { Dropdown } from './Dropdown';
import { useState, useRef, useEffect } from 'react';
import { updateComment } from '@/apis/comment/updateComment';
import { deleteComment } from '@/apis/comment/deleteComment';
import Modal from '../Modal/Modal';

interface CommentProps {
  commentId: number;
  nickname: string;
  commentText: string;
  onUpdate: () => void;
}

const CommentCard = ({ commentId, nickname, commentText, onUpdate }: CommentProps) => {
  const user = useSelector((state: RootState) => state.auth.user)!;
  const isCurrentUser = user.randomNickname === nickname;
  // 댓글 수정
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(commentText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 댓글 삭제
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;

      // 커서 맨 끝으로 이동
      const len = textarea.value.length;
      textarea.setSelectionRange(len, len);

      // 포커스 및 스크롤
      textarea.focus();
      textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // 높이 자동 조절
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setEditedText(commentText);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedText(commentText);
    setIsEditing(false);
  };

  const handleEditSubmit = async () => {
    if (!editedText.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
    try {
      await updateComment({
        comment_id: commentId,
        user_id: user.userId,
        comment_text: editedText,
      });
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      console.error('댓글 수정 실패 : ', err);
    }
  };

  // 모달로 삭제 확인
  const handleConfrimDelete = async () => {
    try {
      await deleteComment({
        comment_id: commentId,
        user_id: user.userId,
      });
      onUpdate();
    } catch (err) {
      console.error('댓글 삭제 실패 : ', err);
      alert('댓글 삭제에 실패했습니다.');
    }
    setIsModalOpen(false);
  };

  return (
    <div
      className={`${isCurrentUser ? 'bg-gray-100' : ''} w-[300px] sm:w-[400px] pt-[5px] pb-[5px] h-auto flex flex-col rounded-xl border border-gray-100`}
    >
      <div className="flex justify-between w-full items-start px-3 ">
        {/* 왼쪽 - 프로필 + 텍스트 */}
        <div className="flex gap-3 w-0 flex-grow min-w-0 ">
          {/* 프로필 고정 */}
          <div className="flex-shrink-0">
            <Profile nickname={nickname} />
          </div>

          {/* 닉네임 + 댓글 */}
          <div className="flex flex-col w-0 flex-grow min-w-0 relative">
            <div className="font-pb text-[11px] sm:text-[12px] mt-[5px]">{nickname}</div>

            {isEditing ? (
              <div className="flex gap-1 items-center mt-1">
                <textarea
                  ref={textareaRef}
                  className="bg-white text-gray-600 font-pr sm:min-w-[235px] min-w-[170px]  text-[12px] sm:text-[15px] border rounded px-2 py-1 w-full resize-none overflow-hidden"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  rows={1}
                />
                <div className="flex gap-2 justify-end mt-1">
                  <button
                    className="p-1 cursor-pointer font-pr text-[10px] sm:text-sm whitespace-nowrap 
                            text-gray-500 
                              hover:text-[var(--color-primary-base)] 
                              active:rounded
                            active:text-white 
                              active:bg-[var(--color-primary-base)]"
                    onClick={handleEditSubmit}
                  >
                    저장
                  </button>

                  <button
                    className="cursor-pointer font-pr text-[10px] sm:text-sm  whitespace-nowrap 
                            text-gray-500
                            hover:text-[var(--color-primary-base)]
                            active:rounded
                            active:text-white
                            active:bg-[var(--color-primary-base)]"
                    onClick={handleCancel}
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="font-pr text-[12px] sm:text-[15px] 
                            text-gray-600 whitespace-pre-wrap break-all my-1"
              >
                {commentText}
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽 - Dropdown */}
        {isCurrentUser && (
          <div className="flex-shrink-0 ml-2 mt-1">
            <Dropdown
              data={['수정', '삭제']}
              commentText={commentText}
              handleEdit={handleEditClick}
              handleRemove={() => setIsModalOpen(true)}
            />
          </div>
        )}
      </div>
      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={handleConfrimDelete}
        text1="댓글을 삭제하시겠습니까?"
      />
    </div>
  );
};

export default CommentCard;
