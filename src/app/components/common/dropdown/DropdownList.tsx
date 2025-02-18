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
  return (
    <div
      className={clsx(
        'absolute z-30 overflow-hidden rounded-xl border border-background-tertiary bg-background-secondary',
        isOpen
          ? 'opacity-100 transition-all duration-200'
          : 'pointer-events-none opacity-0 transition-all duration-200',
        className,
      )}
    >
      {children}
    </div>
  );
}
