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
        'absolute z-30 overflow-hidden rounded-xl border border-background-tertiary bg-background-secondary',
        className,
      )}
    >
      {children}
    </div>
  );
}
