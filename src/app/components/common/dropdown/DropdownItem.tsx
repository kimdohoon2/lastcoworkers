import { ReactNode } from 'react';

interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
  onClose: () => void;
}

export default function DropdownItem({
  children,
  onClick,
  onClose,
}: DropdownItemProps) {
  return (
    <li className="list-none whitespace-nowrap rounded-xl px-14 py-10 text-md font-normal text-text-primary">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
          onClose();
        }}
      >
        {children}
      </button>
    </li>
  );
}
