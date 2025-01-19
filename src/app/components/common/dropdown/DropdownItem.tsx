import { ReactNode } from 'react';

interface DropdownItemProps {
  className?: string;
  children: ReactNode;
  onClick: () => void;
  onClose: () => void;
}

export default function DropdownItem({
  className,
  children,
  onClick,
  onClose,
}: DropdownItemProps) {
  return (
    <li className="list-none">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
          onClose();
        }}
        className={`w-full whitespace-nowrap rounded-xl px-4 py-3 text-center text-md font-normal text-text-primary hover:bg-background-tertiary ${className}`}
      >
        {children}
      </button>
    </li>
  );
}
