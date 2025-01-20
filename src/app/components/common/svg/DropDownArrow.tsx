interface DropdownArrowProps {
  className?: string;
}

export default function DropDownArrow({ className }: DropdownArrowProps) {
  return (
    <svg
      className={`${className || ''}`}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="#F8FAFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
