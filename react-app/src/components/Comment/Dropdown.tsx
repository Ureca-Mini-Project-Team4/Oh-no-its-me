import { useEffect, useRef, useState } from 'react';
import Modal from '../Modal/Modal';

interface DropdownProps {
  data: string[];
  commentText: string;
  handleEdit: () => void;
  handleRemove: () => void;
}

export const Dropdown = ({ data, handleEdit, handleRemove }: DropdownProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (showOptions) {
      timerRef.current = window.setTimeout(() => {
        setShowOptions(false);
        timerRef.current = null;
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowOptions(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 삭제 확정 시 실행 함수
  const handleConfirmDelete = async () => {
    try {
      await handleRemove();
    } catch (error) {
      console.error('댓글 삭제 실패 : ', error);
      alert('댓글 삭제에 실패했습니다.');
    }
    setIsModalOpen(false);
  };

  const handleItemClick = (item: string) => {
    console.log('댓글 클릭 : ', item);
    if (item === '수정') {
      handleEdit();
    } else if (item === '삭제') {
      handleRemove();
    }
    setShowOptions(false);
  };

  return (
    <>
      <div
        ref={selectRef}
        className="relative"
        onMouseEnter={() => {
          if (timerRef.current) clearTimeout(timerRef.current);
        }}
        onMouseLeave={() => {
          if (showOptions) {
            timerRef.current = window.setTimeout(() => {
              setShowOptions(false);
            }, 3000);
          }
        }}
      >
        <div
          className="items-center cursor-pointer"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          <p className="text-gray-500 text-lg">…</p>
        </div>
        {showOptions && (
          <ul
            className="absolute top-1/2 -translate-y-1/2 right-full mr-2
                  bg-white border border-gray-300 rounded-md
                  w-14 sm:w-16"
          >
            {data.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(item)}
                className="w-full font-pm text-xs sm:text-sm pt-1.5 pb-1.5 px-2 text-center 
                   text-gray-600 hover:bg-[var(--color-primary-base)] hover:text-white 
                   cursor-pointer rounded-md transition"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={handleConfirmDelete}
        text1="댓글을 삭제하시겠습니까?"
      />
    </>
  );
};
