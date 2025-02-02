import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie } from 'recharts';
import getTaskList, { Task } from '@/app/lib/group/getTaskList';
import Link from 'next/link';
import IconTaskDone from '../icons/IconTaskDone';
import DropdownMenu from './DropdownMenu';

interface TodoListProps {
  groupId: number;
  taskLists?: { id: number; name: string }[];
}

export default function TodoList({ groupId, taskLists = [] }: TodoListProps) {
  const backgroundColors = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
    'bg-point-rose',
    'bg-point-orange',
    'bg-point-yellow',
  ];

  const todayDate = `${new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '-')
    .replace('.', '')}T00:00:00Z`;

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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !data) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

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
        const taskListData = data[index];

        if (!taskListData) {
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
