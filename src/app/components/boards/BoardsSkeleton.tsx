interface BoardsSkeletonProps {
  className?: string;
}

export default function BoardsSkeleton({
  className = '',
}: BoardsSkeletonProps) {
  return (
    <div
      className={`shinny w-full rounded-[12px] border border-[#F8FAFC1A] bg-background-secondary px-4 tablet:px-8 ${className}`}
    />
  );
}
