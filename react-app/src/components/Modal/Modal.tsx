import React from 'react';
import { ModalProps } from './Modal.types';
import Button from '../Button/Button';

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-50  rounded-2xl shadow-xl p-5 sm:p-7 w-[90%] max-w-md">
        <p className="text-gray-700 font-pr mb-10 sm:mb-15 text-[14px] sm:text-[16px]">
          투표를 완료하시겠습니까?
        </p>
        <div className="flex gap-4">
          <Button label="취소" type="outline" onClick={() => setIsOpen(false)} />
          <Button label="확인" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
