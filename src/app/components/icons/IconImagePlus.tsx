export default function IconImagePlus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_18371_3190)">
        <path
          d="M2 12.5H22"
          stroke="#9CA3AF"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M12 22.5L12 2.5"
          stroke="#9CA3AF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_18371_3190">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
