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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white  rounded-2xl shadow-xl p-6 sm:p-7 w-[90%] max-w-md text-center">
        <p className="flex justify-center items-center font-pr text-[22px] font-bold sm:text-[24px] my-5">
          {text1}
        </p>
        {text2 && <p className="text-gray-700 font-pr my-5 text-[16px] sm:text-[18px]">{text2}</p>}
        <div className="flex gap-4 ">
          <Button label="취소" type="outline" onClick={handleCancel} />
          <Button label="확인" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
