import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface DropdownListProps {
  className?: string;
  isOpen: boolean;
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
        'absolute z-20 rounded-xl border border-background-tertiary border-opacity-10 bg-background-secondary',
        className,
      )}
    >
      {children}
    </div>
  );
}
