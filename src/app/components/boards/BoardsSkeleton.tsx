interface BoardsSkeletonProps {
  className?: string;
}

export default function BoardsSkeleton({
  className = '',
}: BoardsSkeletonProps) {
  return (
    <div
      className={`flex w-full animate-pulse flex-col justify-between rounded-[0.75rem] border border-[#F8FAFC1A] bg-background-secondary px-4 pt-2 tablet:px-8 tablet:pb-6 tablet:pt-6 ${className}`}
    >
      <div className="flex justify-between gap-4">
        <div className="h-3 w-16 bg-background-tertiary text-md tablet:text-2lg" />
        <div className="h-16 w-16 bg-background-tertiary tablet:h-[4.5rem] tablet:w-[4.5rem]" />
      </div>
      <div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-background-tertiary" />
            <div className="h-3 w-16 bg-background-tertiary" />
          </div>
          <div>
            <div className="h-4 w-4 rounded-full bg-background-tertiary" />
          </div>
        </div>
      </div>
    </div>
  );
}
