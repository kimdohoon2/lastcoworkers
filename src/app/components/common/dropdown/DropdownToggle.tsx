import { ReactNode } from 'react';

interface DropdownToggleProps {
  className?: string;
  children: ReactNode;
  onClick: () => void; // 드롭다운 열고 닫는 함수
}

export default function DropdownToggle({
  className,
  children,
  onClick,
}: DropdownToggleProps) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
