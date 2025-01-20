'use client';

import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'inverse' | 'secondary' | 'danger';
  size?: 'small' | 'large';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

function Button({
  children,
  variant = 'primary',
  size = 'large',
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'items-center font-semibold justify-center rounded-xl';

  const variantStyles = {
    primary:
      'bg-brand-primary text-text-default hover:bg-interaction-hover active:bg-interaction-pressed',
    inverse:
      size === 'small'
        ? 'bg-background-secondary border-brand-primary border-[1px] text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:text-interaction-pressed'
        : 'bg-background-inverse border-brand-primary border-[1px] text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:text-interaction-pressed',
    secondary:
      'bg-background-inverse text-text-danger border-[1px] border-text-secondary',
    danger: 'bg-point-red hover:bg-red-600 active:bg-red-700',
  };

  const disabledStyles = {
    primary: 'bg-interaction-inactive cursor-not-allowed',
    inverse:
      size === 'small'
        ? 'bg-background-secondary border-[1px] border-interaction-inactive text-interaction-inactive cursor-not-allowed'
        : 'bg-background-inverse border-[1px] border-interaction-inactive text-interaction-inactive cursor-not-allowed',
    secondary: 'cursor-not-allowed',
    danger: 'bg-gray-200 text-gray-400 cursor-not-allowed',
  };

  const sizeStyles = {
    small: 'px-2 py-1 text-md w-20 h-[32px]',
    large: 'px-32 py-3.5 text-lg w-[332px] h-12',
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], {
        [variantStyles[variant]]: !disabled,
        [disabledStyles[variant]]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
