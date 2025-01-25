'use client';

import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'inverse'
    | 'secondary'
    | 'danger'
    | 'plus'
    | 'complete'
    | 'cancel';
  size?: 'small' | 'large' | 'plus' | 'complete' | 'cancel';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  children,
  variant = 'primary',
  size = 'large',
  onClick,
  disabled = false,
  className,
  type,
}: ButtonProps) {
  const baseStyles = 'items-center font-semibold justify-center';

  const variantStyles = {
    /** primary: 기본 버튼
     * inverse: 닫기 버튼
     * secondary: 회원 탈퇴 기능에서 danger 버튼과 함께 쓰이는 닫기 버튼
     * danger: 회원 탈퇴 시 확인 버튼
     * plus: 할 일 추가 버튼
     * complete: 완료하기 버튼
     * cancel: 완료 취소하기 버튼
     */
    primary:
      'bg-brand-primary text-text-default hover:bg-interaction-hover active:bg-interaction-pressed',
    inverse:
      size === 'small'
        ? 'bg-background-secondary border-brand-primary border-[1px] text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:text-interaction-pressed'
        : 'bg-background-inverse border-brand-primary border-[1px] text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:text-interaction-pressed',
    secondary:
      'bg-background-inverse text-text-danger border-[1px] border-text-secondary',
    danger: 'bg-point-red hover:bg-red-600 active:bg-red-700',
    plus: 'bg-brand-primary text-text-default hover:bg-interaction-hover active:bg-interaction-pressed',
    complete:
      'bg-brand-primary text-text-default hover:bg-interaction-hover active:bg-interaction-pressed',
    cancel:
      'bg-background-inverse border-brand-primary border-[1px] text-brand-primary hover:border-interaction-hover hover:text-interaction-hover active:border-interaction-pressed active:text-interaction-pressed',
  };

  const disabledStyles = {
    primary: 'bg-interaction-inactive cursor-not-allowed',
    inverse:
      size === 'small'
        ? 'bg-background-secondary border-[1px] border-interaction-inactive text-interaction-inactive cursor-not-allowed'
        : 'bg-background-inverse border-[1px] border-interaction-inactive text-interaction-inactive cursor-not-allowed',
    secondary: 'cursor-not-allowed',
    danger: 'bg-gray-200 text-gray-400 cursor-not-allowed',
    plus: 'bg-interaction-inactive cursor-not-allowed',
    complete: 'bg-interaction-inactive cursor-not-allowed',
    cancel:
      'bg-background-inverse border-[1px] border-interaction-inactive text-interaction-inactive cursor-not-allowed',
  };

  const sizeStyles = {
    small: 'text-md w-20 h-[32px] rounded-xl',
    large: 'text-lg w-[332px] h-12 rounded-xl',
    plus: 'text-lg w-[125px] h-[48px] rounded-[40px] ',
    complete: 'text-md w-[111px] h-10 rounded-[40px] ',
    cancel: 'text-md w-[138px] h-10 rounded-[40px] ',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        {
          [variantStyles[variant]]: !disabled,
          [disabledStyles[variant]]: disabled,
        },
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className="flex items-center justify-center gap-1">{children}</span>
    </button>
  );
}

export default Button;
