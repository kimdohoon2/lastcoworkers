'use client';

import React from 'react';
import { PieChart, Pie } from 'recharts';
import Link from 'next/link';
import IconTaskDone from '@/app/components/icons/IconTaskDone';
import TaskListDropdown from '@/app/components/team/TaskListDropdown';
import { Task } from '@/app/lib/group/getTaskList';
import { GroupTask } from '@/app/types/grouptask';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoListItemProps {
  id: number;
  taskList: GroupTask;
  groupId: number;
  backgroundColor: string;
  taskListData: { tasks?: Task[] };
}

export default function TodoListItem({
  id,
  taskList,
  groupId,
  backgroundColor,
  taskListData,
}: TodoListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="mt-4 block h-10 min-h-[2.5rem] w-full rounded-xl border border-background-inverse"
      />
    );
  }

  const tasks = taskListData.tasks || [];
  const completedItems = tasks.filter((task) => task.doneAt !== null).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks
    ? (completedItems / totalTasks) * 100
    : 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative mt-4 flex h-10 w-full items-center rounded-xl bg-background-secondary pl-6 pr-4 hover:z-10"
    >
      <Link
        href={`/${groupId}/${taskList.id}`}
        className="z-0 flex h-10 flex-1 items-center justify-between overflow-hidden"
      >
        <div
          className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColor}`}
        />
        <div className="truncate text-base font-medium text-white">
          {taskList.name}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex w-16 items-center gap-1 rounded-xl bg-background-primary px-2 py-1">
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
                  isAnimationActive={false}
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
        </div>
      </Link>
      <TaskListDropdown
        groupId={groupId}
        taskListId={taskList.id}
        taskListName={taskList.name}
      />
    </div>
  );
}
