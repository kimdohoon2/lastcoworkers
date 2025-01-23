'use client';

import TaskCard from '@/app/components/tasklist/TaskCard';
import { useTasksQuery } from '@/app/lib/task/getTask';
import { Task } from '@/app/types/task';

function TaskCardList({
  groupId = 1771,
  taskListId = 2874,
  date,
}: {
  groupId: number;
  taskListId: number;
  date: string;
}) {
  const { data, isLoading, error } = useTasksQuery(groupId, taskListId, date);

  if (isLoading) {
    return <div>로딩 중입니다</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!data || data.length === 0) {
    return <div>아직 할 일이 없습니다. 할 일을 추가해보세요.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {data.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskCardList;
