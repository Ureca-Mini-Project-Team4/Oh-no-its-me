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
      <div className="bg-white rounded-2xl shadow-lg px-12 py-8 w-[90%] max-w-sm text-center">
        <p className="font-pr text-[18px]  text-gray-900 mb-3">{text1}</p>
        {text2 && <p className="font-pr text-base text-gray-600 mb-6">{text2}</p>}
        <div className="flex justify-center gap-3 mt-12">
          <Button label="취소" type="outline" onClick={handleCancel} size="full" />
          <Button label="확인" onClick={onConfirm} size="full" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
