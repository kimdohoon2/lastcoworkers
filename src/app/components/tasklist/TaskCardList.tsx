'use client';

import TaskCard from '@/app/components/tasklist/TaskCard';
import { useTasksQuery } from '@/app/lib/task/getTask';
import { Task } from '@/app/types/task';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleCardClick = (taskId: number) => {
    router.push(
      `/group/${groupId}/task-lists/${taskListId}/task?taskId=${taskId}`,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCardClick(taskId);
      e.preventDefault();
    }
  };

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
          <div
            key={task.id}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(task.id)}
            onKeyDown={(e) => handleKeyDown(e, task.id)}
            className="cursor-pointer rounded-[0.5rem] border border-transparent transition-all duration-200 ease-in-out hover:border-background-inverse"
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskCardList;
