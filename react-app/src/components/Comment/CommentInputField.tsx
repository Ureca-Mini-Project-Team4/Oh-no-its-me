import { useRef } from 'react';
import { IMAGES } from '@/constants/imagePath';

interface CommentInputFieldProps {
  nickname: string;
  comment: string;
  onChangeComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
}

const CommentInputField = ({
  nickname,
  comment,
  onChangeComment,
  onSubmit,
}: CommentInputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      inputRef.current?.focus();
      return;
    }
    await onSubmit();
  };

  return (
    <div className="flex items-start gap-2 w-full">
      <img
        src={IMAGES.ANIMAL(nickname)}
        alt={`${nickname} 프로필`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-1 items-center gap-2">
        <input
          ref={inputRef}
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)] 
                     focus:border-[var(--color-primary-base)] 
                     text-sm sm:text-base font-pr
                     max-w-[calc(65%)] sm:max-w-full"
          value={comment}
          onChange={onChangeComment}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              await handleSubmit();
            }
          }}
          placeholder="댓글을 입력하세요."
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer w-[60px] h-10 text-[12px] font-pr border rounded-lg 
                     bg-[var(--color-primary-base)] text-white flex items-center justify-center 
                     text-sm sm:text-base whitespace-nowrap focus:outline-none 
                     focus:ring-2 focus:ring-[var(--color-primary-base)]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CommentInputField;
