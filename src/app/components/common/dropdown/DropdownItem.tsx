import { PropsWithChildren } from 'react';

interface DropdownItemProps {
  className?: string;
  onClick: () => void;
  onClose: () => void;
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
