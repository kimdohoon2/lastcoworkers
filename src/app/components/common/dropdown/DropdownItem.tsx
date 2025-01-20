import { PropsWithChildren } from 'react';

interface DropdownItemProps {
  className?: string;
  onClick: () => void; // 아이템 클릭시 실행 함수
  onClose: () => void; // 아이템 클릭 후 드롭다운을 닫는 함수
}

export default function DropdownItem({
  className,
  children,
  onClick,
  onClose,
}: PropsWithChildren<DropdownItemProps>) {
  return (
    <li className="list-none">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
          onClose();
        }}
        className={`w-full truncate rounded-xl px-4 py-3 text-center text-md font-normal text-text-primary hover:bg-background-tertiary ${className}`}
      >
        {children}
      </button>
    </li>
  );
}
