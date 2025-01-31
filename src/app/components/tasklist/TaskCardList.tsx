'use client';

import TaskCard from '@/app/components/tasklist/TaskCard';
import { useTasksQuery } from '@/app/lib/task/getTask';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import selectTasksArray from '@/app/stores/selectors';
import { setTasks } from '@/app/stores/tasksSlice';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

function TaskCardList({
  groupId = 1771,
  taskListId = 2874,
  date,
}: {
  groupId: number;
  taskListId: number;
  date: string;
}) {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useTasksQuery(groupId, taskListId, date);
  const router = useRouter();
  const params = useParams();

  const teamid = params.teamid as string;
  const tasks = useAppSelector(selectTasksArray);

  useEffect(() => {
    if (data) {
      dispatch(setTasks(data));
    }
  }, [data, dispatch]);

  const handleCardClick = (taskid: number) => {
    router.push(`/${teamid}/${taskid}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: number) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

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

  if (!tasks || tasks.length === 0) {
    return (
      <div className="mt-[11.9375rem] flex h-screen justify-center text-md text-text-default tablet:mt-[21.5625rem] lg:mt-[19.375rem]">
        아직 할 일이 없습니다. <br /> 할 일을 추가해보세요.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(task.id)}
            onKeyDown={(e) => handleKeyDown(e, task.id)}
            className="cursor-pointer rounded-[0.5rem] border border-transparent transition-all duration-200 ease-in-out hover:border-background-inverse"
          >
            <TaskCard taskId={task.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskCardList;
