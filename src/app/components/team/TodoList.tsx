import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getTaskList from '@/app/lib/group/getTaskList';
import TodoListItem from '@/app/components/team/TodoListItem';

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
    return <div className="mx-auto my-6 max-w-[75rem]">로딩 중...</div>;
  }

  if (isError || !data) {
    return (
      <div className="mx-auto my-6 max-w-[75rem]">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (taskLists.length === 0) {
    return (
      <div className="mx-auto my-6 flex max-w-[75rem] items-center justify-center">
        <div className="text-md font-medium text-text-default">
          아직 할 일 목록이 없습니다.
        </div>
      </div>
    );
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

      {taskLists.map((taskList, index) => (
        <TodoListItem
          key={taskList.id}
          taskList={taskList}
          groupId={groupId}
          backgroundColor={backgroundColors[index % backgroundColors.length]}
          taskListData={data[index]}
        />
      ))}
    </div>
  );
}
