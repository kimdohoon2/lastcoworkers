function TaskCommentSkeleton() {
  return (
    <div className="shiny mb-4 animate-pulse border-b border-border-primary/10 bg-background-secondary pb-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-3/4 rounded bg-background-tertiary" />
          <div className="h-6 w-6 rounded bg-background-tertiary" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-background-tertiary" />
            <div className="h-4 w-20 rounded bg-background-tertiary" />
          </div>

          <div className="h-4 w-20 rounded bg-background-tertiary" />
        </div>
      </div>
    </div>
  );
}

export default TaskCommentSkeleton;
