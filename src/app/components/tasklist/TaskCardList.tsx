'use client';

import TaskCard from '@/app/components/tasklist/TaskCard';
import { useTasksQuery } from '@/app/lib/task/getTask';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import selectTasksArray from '@/app/stores/selectors';
import { setTasks } from '@/app/stores/tasksSlice';
import { useEffect, useState } from 'react';
import TaskDetailDrawer from '../taskdetail/TaskDetailDrawer';

function TaskCardList({
  groupId,
  taskListId,
  date,
}: {
  groupId: number;
  taskListId: number;
  date: string;
}) {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useTasksQuery(groupId, taskListId, date);

  const tasks = useAppSelector(selectTasksArray);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      dispatch(setTasks(data));
    }
  }, [data, dispatch]);

  const openDrawer = (taskid: number) => {
    setSelectedTaskId(taskid);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedTaskId(null), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: number) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      openDrawer(taskId);
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
            onClick={() => openDrawer(task.id)}
            onKeyDown={(e) => handleKeyDown(e, task.id)}
            className="cursor-pointer rounded-[0.5rem] border border-transparent transition-all duration-200 ease-in-out hover:border-background-inverse"
          >
            <TaskCard
              teamId={groupId}
              taskListId={taskListId}
              taskId={task.id}
            />
          </div>
        ))}
      </div>
      {isDrawerOpen && selectedTaskId !== null && (
        <TaskDetailDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          groupId={groupId}
          taskListId={taskListId}
          taskId={selectedTaskId}
        />
      )}
    </div>
  );
}

export default TaskCardList;
