import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, type, size }) => {
  const baseStyle = `font-bold text-center font-pr`;

  const typeStyle = (() => {
    if (disabled) {
      return type === 'outline'
        ? 'bg-gray-100 text-gray-400 border-2 border-gray-300 cursor-not-allowed'
        : 'bg-gray-300 text-white cursor-not-allowed';
    }

    return type === 'outline'
      ? 'bg-white text-gray-700 border-1 border-gray-300 hover:bg-gray-200'
      : 'bg-[var(--color-primary-base)] text-white hover:bg-[var(--color-primary-hover)]';
  })();

  const sizeStyle = (() => {
    switch (size) {
      case 'full':
      default:
        return 'w-full h-[39px] rounded-[8px] text-sm sm:h-[55px] sm:rounded-[20px] sm:text-xl';
      case 'lg':
        return 'w-[188px] h-[55px] rounded-[20px] text-xl';
      case 'sm':
        return 'w-[57px] h-[34px] rounded-[8px] text-sm';
    }
  })();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${typeStyle} ${sizeStyle}`}
    >
      {label}
    </button>
  );
};

export default Button;
