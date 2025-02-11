function TaskCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2.5 rounded-lg bg-background-secondary px-3.5 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-grow items-center gap-2">
          <span className="m-1 h-5 w-5 rounded bg-background-tertiary" />

          <span className="h-4 w-1/3 rounded bg-background-tertiary" />

          <p className="ml-auto flex items-center gap-1 text-xs sm:ml-2">
            <span className="h-4 w-4 rounded bg-background-tertiary" />{' '}
            <span className="h-4 w-6 rounded bg-background-tertiary" />{' '}
          </p>
        </div>

        <span className="h-5 w-5 rounded bg-background-tertiary" />
      </div>

      <div className="h-4 w-3/5 rounded bg-background-tertiary tablet:w-1/3" />
    </div>
  );
}

export default TaskCardSkeleton;
