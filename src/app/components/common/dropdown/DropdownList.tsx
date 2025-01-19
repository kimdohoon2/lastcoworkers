import { ReactNode } from 'react';
import clsx from 'clsx';

interface DropdownListProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
}

export default function DropdownList({
  className,
  children,
  isOpen,
}: DropdownListProps) {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'absolute z-20 rounded-xl border border-background-tertiary border-opacity-10 bg-background-secondary',
        className,
      )}
    >
      {children}
    </div>
  );
}
