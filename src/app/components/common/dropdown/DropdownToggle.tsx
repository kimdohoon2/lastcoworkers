import { PropsWithChildren } from 'react';

interface DropdownToggleProps {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>; // 드롭다운 열고 닫는 함수
}

export default function DropdownToggle({
  className,
  children,
  onClick,
}: PropsWithChildren<DropdownToggleProps>) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
