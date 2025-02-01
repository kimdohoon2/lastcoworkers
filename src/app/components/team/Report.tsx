import React from 'react';
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { PieChart, Pie } from 'recharts';
import getTaskList, {
  GetTaskListResponse,
  Task,
} from '@/app/lib/group/getTaskList';
import IconReportTodo from '../icons/IconReportTodo';
import IconReportDone from '../icons/IconReportDone';

interface ReportProps {
  groupId: number;
  taskLists?: { id: number; name: string }[];
}

export default function Report({ groupId, taskLists = [] }: ReportProps) {
  // 오늘 날짜를 'YYYY-MM-DDT00:00:00Z' 형식으로 변환
  const todayDate = `${new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '-')
    .replace('.', '')}T00:00:00Z`;

  const taskQueries = useQueries({
    queries: taskLists.map((taskList) => ({
      queryKey: ['taskList', groupId, taskList.id],
      queryFn: (): Promise<GetTaskListResponse> =>
        getTaskList({ groupId, taskListId: taskList.id, date: todayDate }),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isLoading = taskQueries.some(
    (query: UseQueryResult<GetTaskListResponse>) => query.isLoading,
  );
  const isError = taskQueries.some(
    (query: UseQueryResult<GetTaskListResponse>) => query.isError,
  );

  if (isLoading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const totalTasks = taskQueries.reduce<number>(
    (acc: number, query: { data?: GetTaskListResponse }) =>
      acc + (query.data?.tasks.length ?? 0),
    0,
  );

  const completedTasks = taskQueries.reduce<number>(
    (acc: number, query: { data?: GetTaskListResponse }) =>
      acc +
      (query.data?.tasks.filter((task: Task) => task.doneAt !== null).length ??
        0),
    0,
  );

  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="mx-auto my-12 flex max-w-[75rem] flex-col gap-4 xl:my-16">
      <h2 className="text-lg font-semibold text-white">리포트</h2>
      <div className="h-56 w-full rounded-xl bg-background-secondary p-6 xl:h-[13.5625rem]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-10 xl:gap-16">
            <PieChart width={140} height={140}>
              <svg>
                <defs>
                  <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#A3E635" />
                  </linearGradient>
                </defs>
              </svg>
              <Pie
                data={[{ name: 'Background', value: 100 }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                fill="#334155"
                stroke="none"
              />
              <Pie
                data={[{ name: 'Completed', value: completionPercentage }]}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                startAngle={270}
                endAngle={270 + (completionPercentage * 360) / 100}
                fill="url(#progressGradient)"
                stroke="none"
                cornerRadius={24}
              />
              <text
                x="50%"
                y="44%"
                textAnchor="middle"
                fontSize="12"
                fontWeight="500"
                fill="#F8FAFC"
                className="block tablet:hidden"
              >
                오늘
              </text>
              <text
                x="52%"
                y="60%"
                textAnchor="middle"
                fontSize="20"
                fontWeight="700"
                fill="url(#progressGradient)"
                className="block tablet:hidden"
              >
                {completionPercentage.toFixed(0)}%
              </text>
            </PieChart>
            <div className="hidden flex-col gap-1 tablet:flex">
              <span className="text-md font-medium text-text-primary">
                오늘의 진행상황
              </span>
              <div className="bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-4xl font-bold text-transparent">
                {completionPercentage.toFixed(0)}%
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex h-20 w-[8.875rem] items-center justify-between rounded-xl bg-background-tertiary px-4 tablet:w-[17.5rem] xl:w-[25rem]">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-text-secondary">
                    오늘의 할 일
                  </span>
                  <span className="text-2xl font-bold text-brand-tertiary">
                    {totalTasks}개
                  </span>
                </div>
                <IconReportTodo />
              </div>
              <div className="flex h-20 w-[8.875rem] items-center justify-between rounded-xl bg-background-tertiary px-4 tablet:w-[17.5rem] xl:w-[25rem]">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-text-secondary">
                    한 일
                  </span>
                  <span className="text-2xl font-bold text-brand-tertiary">
                    {completedTasks}개
                  </span>
                </div>
                <IconReportDone />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
