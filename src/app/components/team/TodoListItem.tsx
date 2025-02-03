import React from 'react';
import { PieChart, Pie } from 'recharts';
import Link from 'next/link';
import IconTaskDone from '../icons/IconTaskDone';
import DropdownMenu from './DropdownMenu';
import { Task } from '@/app/lib/group/getTaskList';

interface TodoListItemProps {
  taskList: { id: number; name: string };
  groupId: number;
  backgroundColor: string;
  taskListData: { tasks: Task[] } | undefined;
}

export default function TodoListItem({
  taskList,
  groupId,
  backgroundColor,
  taskListData,
}: TodoListItemProps) {
  if (!taskListData) {
    return (
      <div
        className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-2"
        key={taskList.id}
      >
        <div
          className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColor}`}
        />
        <span className="text-white">{taskList.name}</span>
        <span className="text-sm font-bold text-gray-600">로딩 중...</span>
        <DropdownMenu iconType="task" />
      </div>
    );
  }

  const completedItems = taskListData.tasks.filter(
    (task) => task.doneAt !== null,
  ).length;
  const totalTasks = taskListData.tasks.length;
  const completionPercentage = (completedItems / totalTasks) * 100;

  return (
    <div
      key={taskList.id}
      className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-4"
    >
      <div
        className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColor}`}
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
                data={[{ name: 'Completed', value: completionPercentage }]}
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
}
