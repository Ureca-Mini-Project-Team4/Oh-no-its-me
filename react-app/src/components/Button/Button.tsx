import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type,
  width,
  height,
}) => {
  const baseStyle = 'rounded-[20px] font-bold text-center font-pr';

  const typeStyle =
    type === 'default'
      ? 'bg-[var(--color-primary-base)] text-white hover:bg-[var(--color-primary-hover)]'
      : 'bg-white text-[var(--color-primary-base)] border border-[var(--color-primary-base)] hover:bg-[var(--color-primary-light)]/15';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${typeStyle}`}
      style={{ width, height }}
    >
      {label}
    </button>
  );
};

export default Button;
