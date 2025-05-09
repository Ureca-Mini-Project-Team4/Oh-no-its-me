import React from 'react';
import { ModalProps } from './Modal.types';
import Button from '../Button/Button';

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, onConfirm }) => {
  if (!isOpen) return null;

  const handleCancel = () => setIsOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white  rounded-2xl shadow-xl p-6 sm:p-7 w-[90%] max-w-md text-center">
        <p className="font-pr text-[22px] font-bold sm:text-[24px] mt-3 sm:mt-5">
          투표를 완료하시겠습니까?
        </p>
        <p className="text-gray-700 font-pr mb-5 sm:mb-10 text-[16px] sm:text-[18px]">
          한 번 완료하면 다시 투표할 수 없어요
        </p>
        <div className="flex gap-4">
          <Button label="취소" type="outline" onClick={handleCancel} />
          <Button label="확인" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
