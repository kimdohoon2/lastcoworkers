import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface DropdownListProps {
  className?: string;
  isOpen: boolean; // 드롭다운 열림 여부 판단 변수
}

export default function DropdownList({
  className,
  children,
  isOpen,
}: PropsWithChildren<DropdownListProps>) {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'absolute z-20 overflow-hidden rounded-xl border border-background-tertiary border-opacity-10 bg-background-secondary',
        className,
      )}
    >
      {children}
    </div>
  );
}
