import React from 'react';
import TaskCardDropdown from '../icons/TaskCardDropdown';

export default function TodoListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="relative mt-4 flex h-10 w-full animate-pulse items-center rounded-xl bg-background-secondary pl-6 pr-4"
        >
          <div className="absolute left-0 h-10 w-3 rounded-l-xl bg-background-tertiary" />
          <div className="ml-4 h-4 w-1/6 rounded bg-background-tertiary"></div>
          <div className="absolute right-4 flex items-center gap-2">
            <div className="h-6 w-14 rounded-xl bg-background-tertiary px-2 py-1"></div>
            <TaskCardDropdown />
          </div>
        </div>
      ))}
    </div>
  );
}
