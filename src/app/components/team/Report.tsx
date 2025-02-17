import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getTaskList, { GetTaskListResponse } from '@/app/lib/group/getTaskList';
import getTodayDate from '@/app/utils/getTodayDate';
import IconReportTodo from '@/app/components/icons/IconReportTodo';
import IconReportDone from '@/app/components/icons/IconReportDone';
import ProgressChart from '@/app/components/team/ProgressChart';
import TaskSummaryCard from '@/app/components/team/TaskSummaryCard';
import ReportSkeleton from '@/app/components/team/ReportSkeleton';

interface ReportProps {
  groupId: number;
  taskLists?: { id: number; name: string }[];
}

export default function Report({ groupId, taskLists = [] }: ReportProps) {
  const todayDate = getTodayDate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['taskLists', groupId],
    queryFn: async () => {
      const responses = await Promise.all(
        taskLists.map((taskList) =>
          getTaskList({ groupId, taskListId: taskList.id, date: todayDate }),
        ),
      );
      return responses;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <ReportSkeleton />;
  if (isError) return <div className="text-red-500">데이터 오류 발생</div>;

  const dataArray = (
    Array.isArray(data) ? data : Object.values(data ?? {})
  ) as GetTaskListResponse[];

  const totalTasks =
    dataArray.reduce(
      (acc: number, taskList: GetTaskListResponse) =>
        acc + taskList.tasks.length,
      0,
    ) ?? 0;
  const completedTasks =
    dataArray.reduce(
      (acc: number, taskList: GetTaskListResponse) =>
        acc + taskList.tasks.filter((task) => task.doneAt).length,
      0,
    ) ?? 0;
  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="mx-auto my-12 flex max-w-[75rem] flex-col gap-4 xl:my-16">
      <h2 className="text-lg font-semibold text-text-primary">리포트</h2>
      <div className="flex h-56 w-full justify-between gap-4 rounded-xl bg-background-secondary p-6 xl:h-[13.5625rem]">
        <div className="flex items-center gap-10 xl:gap-16">
          <ProgressChart completionPercentage={completionPercentage} />
          <div className="hidden flex-col gap-1 tablet:flex">
            <span className="text-md font-medium text-text-primary">
              오늘의 진행상황
            </span>
            <div className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-4xl font-bold text-transparent">
              {completionPercentage.toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TaskSummaryCard
            title="오늘의 할 일"
            count={totalTasks}
            icon={<IconReportTodo />}
          />
          <TaskSummaryCard
            title="한 일"
            count={completedTasks}
            icon={<IconReportDone />}
          />
        </div>
      </div>
    </div>
  );
}
