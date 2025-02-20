import { PropsWithChildren } from 'react';

interface DropdownItemProps {
  className?: string;
  onClick: () => void;
  onClose?: () => void;
}

export default function DropdownItem({
  className,
  children,
  onClick,
  onClose,
}: PropsWithChildren<DropdownItemProps>) {
  return (
    <div className="list-none">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
          if (onClose) onClose();
        }}
        className={`w-full truncate px-4 py-3 text-center text-md font-normal text-text-primary hover:bg-background-tertiary ${className}`}
      >
        {children}
      </button>
    </div>
  );
}
