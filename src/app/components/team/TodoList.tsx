import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getTaskList, { Task } from '@/app/lib/group/getTaskList';
import DropdownMenu from './DropdownMenu';
import Link from 'next/link';

interface TodoListProps {
  groupId: number;
  taskLists?: { id: number; name: string }[]; // taskLists는 id와 name 속성을 가진 배열
}

const TodoList: React.FC<TodoListProps> = ({ groupId, taskLists }) => {
  const backgroundColors = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
    'bg-point-rose',
    'bg-point-orange',
    'bg-point-yellow',
  ];

  const todayDate = new Date().toISOString().split('T')[0] + 'T00:00:00Z';

  if (!taskLists || taskLists.length === 0) {
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
      {taskLists.map((taskList, index) => {
        const {
          data: taskListData,
          isLoading,
          error,
        } = useQuery({
          queryKey: ['taskList', groupId, taskList.id],
          queryFn: () =>
            getTaskList({ groupId, taskListId: taskList.id, date: todayDate }),
          staleTime: 5 * 60 * 1000,
        });

        if (isLoading) {
          return (
            <div
              key={taskList.id}
              className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-2"
            >
              <div
                className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColors[index % backgroundColors.length]}`}
              />
              <span>{taskList.name}</span>
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
              <span>{taskList.name}</span>
              <span className="text-sm font-bold text-gray-600">에러 발생</span>
              <DropdownMenu iconType="task" />
            </div>
          );
        }

        return (
          <Link
            href={`/${groupId}/tasklist/${taskList.id}`}
            className="relative mt-4 flex h-10 w-full items-center justify-between rounded-xl bg-background-secondary pl-6 pr-2"
            key={taskList.id}
          >
            <div
              className={`absolute left-0 h-10 w-3 rounded-l-xl ${backgroundColors[index % backgroundColors.length]}`}
            />
            <span>{taskList.name}</span>
            <div className="flex">
              <div className="text-sm font-normal text-brand-primary">
                /{taskListData.tasks.length}
              </div>
              <DropdownMenu iconType="task" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TodoList;
