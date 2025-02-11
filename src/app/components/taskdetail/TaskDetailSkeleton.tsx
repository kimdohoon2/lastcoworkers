import TaskCommentInput from './TaskCommentInput';
import TaskCommentSkeleton from './TaskCommentSkeleton';

function TaskDetailSkeleton() {
  return (
    <div className="shiny animate-pulse bg-background-secondary p-4 tablet:p-6 xl:p-10">
      <div className="flex flex-col gap-3">
        <div className="h-6 w-6 rounded bg-background-tertiary" />

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

          <div className="h-4 w-[18.5rem] rounded bg-background-tertiary" />
          <div className="mt-3 h-[6rem] rounded-xl bg-background-tertiary tablet:h-[8rem] xl:h-[10rem]" />
        </div>
        <div className="gap-6">
          <TaskCommentInput taskId={0} />
          <div className="mt-6 flex flex-col gap-4">
            {Array.from({ length: 3 }, (_, i) => (
              <TaskCommentSkeleton key={`comment-skeleton-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailSkeleton;
