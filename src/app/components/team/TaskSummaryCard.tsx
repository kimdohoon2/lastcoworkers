import React from 'react';

interface TaskSummaryCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

export default function TaskSummaryCard({
  title,
  count,
  icon,
}: TaskSummaryCardProps) {
  return (
    <div className="flex h-20 w-[8.875rem] items-center justify-between rounded-xl bg-background-tertiary px-4 tablet:w-[17.5rem] xl:w-[25rem]">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-text-secondary">{title}</span>
        <span className="text-2xl font-bold text-brand-tertiary">
          {count}개
        </span>
      </div>
      {icon}
    </div>
  );
}
