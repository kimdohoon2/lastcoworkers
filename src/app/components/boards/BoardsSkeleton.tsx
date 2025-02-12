interface BoardsSkeletonProps {
  className?: string;
}

export default function BoardsSkeleton({
  className = '',
}: BoardsSkeletonProps) {
  return (
    <div
      className={`w-full rounded-[0.75rem] border border-[#F8FAFC1A] bg-background-secondary px-4 shinny tablet:px-8 ${className}`}
    />
  );
}
