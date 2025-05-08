import React from 'react';
import { ButtonProps } from './Button.types';

const typeStyles: Record<string, string> = {
  default: 'bg-[var(--color-primary-base)] text-white hover:bg-[var(--color-primary-hover)]',
  outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-200',
};

const disabledStyles: Record<string, string> = {
  default: 'bg-gray-300 text-white cursor-not-allowed',
  outline: 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed',
};

const sizeStyles: Record<string, string> = {
  full: 'w-full h-[39px] rounded-[8px] text-sm sm:h-[55px] sm:rounded-[20px] sm:text-xl',
  lg: 'w-[188px] h-[55px] rounded-[20px] text-xl',
  sm: 'w-[57px] h-[34px] rounded-[8px] text-sm',
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type = 'default',
  size = 'full',
}) => {
  const baseStyle = 'font-bold text-center font-pr';
  const typeStyle = disabled ? disabledStyles[type] : typeStyles[type];
  const sizeStyle = sizeStyles[size];

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
