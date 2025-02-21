import { PropsWithChildren, useRef } from 'react';
import clsx from 'clsx';
import useCloseOnOutsideClickAndEsc from '@/app/hooks/useCloseOnOutsideClickAndEsc';

interface DropdownProps {
  className?: string;
  onClose: () => void;
}

export default function Dropdown({
  children,
  onClose,
  className,
}: PropsWithChildren<DropdownProps>) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useCloseOnOutsideClickAndEsc(dropdownRef, onClose);

  return (
    <div ref={dropdownRef} className={clsx('relative w-fit', className)}>
      {children}
    </div>
  );
}
