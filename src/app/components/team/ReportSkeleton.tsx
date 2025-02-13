import React from 'react';

export default function ReportSkeleton() {
  return (
    <div className="mx-auto my-12 flex max-w-[75rem] flex-col gap-4 xl:my-16">
      <h2 className="text-lg font-semibold text-text-primary">리포트</h2>
      <div className="flex h-56 w-full animate-pulse justify-between gap-4 rounded-xl bg-background-secondary p-6 xl:h-[13.5625rem]">
        <div className="flex items-center gap-10 xl:gap-16">
          <div className="h-[140px] w-[140px] rounded-full bg-background-tertiary"></div>

          <div className="hidden flex-col gap-2 tablet:flex">
            <div className="h-5 w-32 rounded bg-background-tertiary"></div>
            <div className="h-8 w-24 rounded bg-background-tertiary"></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-20 w-[8.875rem] rounded-xl bg-background-tertiary px-4 tablet:w-[17.5rem] xl:w-[25rem]"></div>
          <div className="h-20 w-[8.875rem] rounded-xl bg-background-tertiary px-4 tablet:w-[17.5rem] xl:w-[25rem]"></div>
        </div>
      </div>
    </div>
  );
}
