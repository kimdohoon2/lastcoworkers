import { PropsWithChildren, useEffect, useRef } from 'react';
import clsx from 'clsx';

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

  useEffect(() => {
    // 드롭다운 외부 클릭시 닫는 기능
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={dropdownRef} className={clsx('relative', className)}>
      {children}
    </div>
  );
}
