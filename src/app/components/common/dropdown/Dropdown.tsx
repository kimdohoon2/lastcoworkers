import { PropsWithChildren, useRef } from 'react';
import clsx from 'clsx';
import useClickOutside from '@/app/hooks/useClickOutside';

interface DropdownProps {
  className?: string;
  onClose: () => void; // 드롭다운을 닫는 함수
}

export default function Dropdown({
  children,
  onClose,
  className,
}: PropsWithChildren<DropdownProps>) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, onClose);

  return (
    <div ref={dropdownRef} className={clsx('relative w-fit', className)}>
      {children}
    </div>
  );
}
