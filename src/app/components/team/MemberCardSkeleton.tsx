import TaskCardDropdown from '@/app/components/icons/TaskCardDropdown';

function MemberCardSkeleton() {
  return (
    <div className="flex w-full items-center justify-between gap-1.5 rounded-2xl bg-background-secondary px-4 py-3 tablet:px-6 tablet:py-5">
      <div className="w-full overflow-hidden">
        <div className="mb-1.5 flex items-center gap-2 tablet:relative tablet:mb-0.5 tablet:block tablet:pl-11">
          <div className="h-6 w-6 flex-shrink-0 rounded-full bg-background-tertiary shinny tablet:absolute tablet:inset-0 tablet:h-8 tablet:w-8" />
          <div className="h-4 w-full rounded-sm bg-background-tertiary shinny" />
        </div>
        <div className="h-3.5 w-full rounded-sm bg-background-tertiary shinny tablet:ml-11" />
      </div>
      <TaskCardDropdown />
    </div>
  );
}

export default MemberCardSkeleton;
