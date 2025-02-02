import Link from 'next/link';

interface HeaderBoardButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function HeaderBoardButton({
  className,
  onClick,
}: HeaderBoardButtonProps) {
  return (
    <Link
      className={`${className || ''} hover:text-interaction-hover`}
      href="/boards"
      onClick={onClick}
      aria-label="자유게시판으로 이동"
    >
      자유게시판
    </Link>
  );
}
