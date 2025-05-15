import { useRef } from 'react';

interface CommentInputFieldProps {
  nickname: string; // 사용자 이미지 파일명
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

    await onSubmit(); // 상위에서 전달된 async 함수 호출
  };

  return (
    <div className="flex items-start gap-2 w-full ">
      {/* 사용자 이미지 */}
      <img
        src={`/assets/images/animal/${nickname}.jpg`}
        className="w-10 h-10 rounded-full object-cover "
      />

      {/* 댓글 입력창 + 버튼을 감싸는 래퍼 */}
      <div className="flex flex-1 items-center gap-2">
        {/* 댓글 입력창 */}
        <input
          ref={inputRef}
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-100 
                 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)] 
                 focus:border-[var(--color-primary-base)] 
                 text-sm sm:text-base font-pr
                 max-w-[calc(65%)] sm:max-w-full"
          value={comment}
          onChange={(e) => {
            onChangeComment(e);
          }}
          placeholder="댓글을 입력하세요."
        />

        {/* 확인 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-[60px] h-10 text-[12px] font-pr border rounded-lg bg-[var(--color-primary-base)] text-white 
                     flex items-center justify-center text-sm sm:text-base whitespace-nowrap 
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-base)]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CommentInputField;
