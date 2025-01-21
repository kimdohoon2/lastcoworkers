import Link from 'next/link';

interface HeaderBoardButtonProps {
  className?: string;
}

export default function HeaderBoardButton({
  className,
}: HeaderBoardButtonProps) {
  return (
    <Link
      className={`${className || ''} hover:text-interaction-hover`}
      href="/boards"
      aria-label="자유게시판으로 이동"
    >
      자유게시판
    </Link>
  );
}
