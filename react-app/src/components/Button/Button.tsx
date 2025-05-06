import React from 'react';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type,
  size,
  width,
  height,
  borderRadius,
}) => {
  const radiusClass = size === 'sm' ? 'rounded-[8px]' : size === 'lg' ? 'rounded-[20px]' : '';

  const baseStyle = `font-bold text-center font-pr ${radiusClass}`;

  const typeStyle =
    type === 'default'
      ? 'bg-[var(--color-primary-base)] text-white hover:bg-[var(--color-primary-hover)]'
      : 'bg-white text-[var(--color-primary-base)] border border-[var(--color-primary-base)] hover:bg-[var(--color-primary-light)]/15';

  const sizeStyle = (() => {
    switch (size) {
      case 'lg':
        return 'w-[188px] h-[55px] text-xl';
      case 'sm':
        return 'w-[57px] h-[34px] text-sm';
      default:
        return '';
    }
  })();

  const inlineStyle = !size
    ? {
        width,
        height,
        borderRadius,
      }
    : undefined;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${typeStyle} ${sizeStyle}`}
      style={inlineStyle}
    >
      {label}
    </button>
  );
};

export default Button;
