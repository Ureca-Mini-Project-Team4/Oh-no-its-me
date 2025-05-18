import React from 'react';
import { ModalProps } from './Modal.types';
import Button from '../Button/Button';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  text1 = '투표를 완료하시겠습니까?',
  text2,
}) => {
  if (!isOpen) return null;

  const handleCancel = () => setIsOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 w-[90%] max-w-sm text-center">
        <p className="font-pr text-lg sm:text-xl font-semibold text-gray-900 mb-3">{text1}</p>
        {text2 && <p className="font-pr text-sm sm:text-base text-gray-600 mb-6">{text2}</p>}
        <div className="flex justify-center gap-3">
          <Button label="취소" type="outline" onClick={handleCancel} />
          <Button label="확인" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
