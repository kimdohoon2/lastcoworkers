import React from 'react';
import { Task } from '@/app/types/task';
import DropdownMenu from './DropdownMenu';
import Link from 'next/link';

interface TodoListProps {
  taskList?: Task[]; // taskList는 undefined일 수 있으므로 optional로 설정
  teamId: number;
}

const TodoList: React.FC<TodoListProps> = ({ taskList, teamId }) => {
  const backgroundColors = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
    'bg-point-rose',
    'bg-point-orange',
    'bg-point-yellow',
  ];

  if (!taskList || taskList.length === 0) {
    return <div>할 일이 없습니다.</div>;
  }

  return (
    <div className="mx-auto my-6 max-w-[75rem]">
      <div className="flex justify-between">
        <span className="text-lg font-normal">할 일 목록</span>
        <button className="text-sm font-normal text-brand-primary">
          + 새로운 목록 추가하기
        </button>
      </div>
      {taskList.map((task, index) => (
        <Link
          href={`/${teamId}/tasklist/${task.id}`}
          className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-2"
          key={task.id}
        >
          <div
            className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColors[index % backgroundColors.length]}`}
          />
          <span>{task.name}</span>
          <DropdownMenu iconType="task" />
        </Link>
      ))}
    </div>
  );
};

export default TodoList;
