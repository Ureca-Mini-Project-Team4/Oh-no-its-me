import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, type, size }) => {
  const baseStyle = `font-bold text-center font-pr`;

  const typeStyle =
    type === 'outline'
      ? 'bg-white text-[var(--color-primary-base)] border border-[var(--color-primary-base)] hover:bg-[var(--color-primary-light)]/15'
      : 'bg-[var(--color-primary-base)] text-white hover:bg-[var(--color-primary-hover)]';

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
