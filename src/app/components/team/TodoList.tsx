import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { PieChart, Pie } from 'recharts';
import getTaskList, { Task } from '@/app/lib/group/getTaskList';
import Link from 'next/link';
import IconTaskDone from '../icons/IconTaskDone';
import DropdownMenu from './DropdownMenu';

interface TodoListProps {
  groupId: number;
  taskLists?: { id: number; name: string }[];
}

function TodoList({ groupId, taskLists = [] }: TodoListProps) {
  const backgroundColors = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
    'bg-point-rose',
    'bg-point-orange',
    'bg-point-yellow',
  ];

  // 오늘 날짜를 'YYYY-MM-DDT00:00:00Z' 형식으로 변환
  const todayDate = `${new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '-')
    .replace('.', '')}T00:00:00Z`;

  // 💡 `useQueries()`는 항상 최상단에서 호출해야 함
  const taskQueries = useQueries({
    queries: taskLists.map((taskList) => ({
      queryKey: ['taskList', groupId, taskList.id],
      queryFn: () =>
        getTaskList({ groupId, taskListId: taskList.id, date: todayDate }),
      staleTime: 5 * 60 * 1000,
    })),
  });

  if (taskLists.length === 0) {
    return <div>할 일이 없습니다.</div>;
  }

  return (
    <div className="mx-auto my-6 max-w-[75rem]">
      <div className="flex justify-between">
        <span className="text-lg font-normal">
          할 일 목록 ({taskLists.length}개)
        </span>
        <button className="text-sm font-normal text-brand-primary">
          + 새로운 목록 추가하기
        </button>
      </div>
      {taskLists.map((taskList, index) => {
        const { data: taskListData, isLoading, error } = taskQueries[index];

        if (isLoading) {
          return (
            <div
              key={taskList.id}
              className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-2"
            >
              <div
                className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColors[index % backgroundColors.length]}`}
              />
              <span className="text-white">{taskList.name}</span>
              <span className="text-sm font-bold text-gray-600">
                로딩 중...
              </span>
              <DropdownMenu iconType="task" />
            </div>
          );
        }

        if (error || !taskListData) {
          return (
            <div
              key={taskList.id}
              className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-2"
            >
              <div
                className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColors[index % backgroundColors.length]}`}
              />
              <span className="text-white">{taskList.name}</span>
              <span className="text-sm font-bold text-gray-600">에러 발생</span>
              <DropdownMenu iconType="task" />
            </div>
          );
        }

        const completedItems = taskListData.tasks.filter(
          (task: Task) => task.doneAt !== null,
        ).length;
        const totalTasks = taskListData.tasks.length;
        const completionPercentage = (completedItems / totalTasks) * 100;

        return (
          <div
            key={taskList.id}
            className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-4"
          >
            <div
              className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColors[index % backgroundColors.length]}`}
            />
            <Link
              href={`/${groupId}/tasklist/${taskList.id}`}
              className="text-base font-medium text-white"
            >
              {taskList.name}
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex w-14 items-center gap-1 rounded-xl bg-background-primary px-2 py-1">
                {completedItems === totalTasks ? (
                  <IconTaskDone />
                ) : (
                  <PieChart width={16} height={16}>
                    <Pie
                      data={[{ name: 'Background', value: 100 }]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={4}
                      outerRadius={7}
                      startAngle={90}
                      endAngle={-270}
                      fill="#F8FAFC"
                      stroke="none"
                    />
                    <Pie
                      data={[
                        { name: 'Completed', value: completionPercentage },
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={4}
                      outerRadius={7}
                      startAngle={270}
                      endAngle={270 + (completionPercentage * 360) / 100}
                      fill="#10B981"
                      stroke="none"
                      cornerRadius={50}
                    />
                  </PieChart>
                )}
                <div className="text-sm font-medium text-brand-primary">
                  {completedItems}/{totalTasks}
                </div>
              </div>
              <DropdownMenu iconType="task" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
