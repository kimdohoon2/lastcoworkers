import { PropsWithChildren } from 'react';

interface DropdownToggleProps {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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
