import clsx from 'clsx';
import { useEditTaskMutation } from '@/app/lib/task/patchTask';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import { updateTask } from '@/app/stores/tasksSlice';
import IconComment from '../icons/IconComment';
import IconCheckBox from '../icons/IconCheckBox';
import IconUncheckBox from '../icons/IconUncheckBox';
import DateRepeatInfo from './DateRepeatInfo';
import TaskCardDropdown from './TaskCardDropdown';

interface TaskCardInterface {
  teamId: number;
  taskListId: number;
  taskId: number;
}

export default function TaskCard({
  teamId: groupId,
  taskListId,
  taskId,
}: TaskCardInterface) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { mutate: editTask } = useEditTaskMutation();

  const task = useAppSelector((state) => state.tasks.taskById[taskId]);

  if (!task) {
    return null;
  }

  const { name, commentCount, doneAt, date, frequency, recurring } = task;

  const startDate = recurring?.startDate;

  const toggleDone = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();

    const updatedDoneStatus = !doneAt;
    const updatedTask = {
      ...task,
      doneAt: updatedDoneStatus ? new Date().toISOString() : null,
    };

    editTask(
      {
        groupId,
        taskListId,
        taskId,
        name,
        description: task.description,
        done: updatedDoneStatus,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
          dispatch(updateTask(updatedTask));
        },
        onError: () => {
          alert('할 일 상태 변경에 실패했습니다.');
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDone(e);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 rounded-lg bg-background-secondary px-3.5 py-3">
      <div className="flex flex-nowrap items-center justify-between gap-2">
        <div className="flex flex-grow items-center gap-2 overflow-hidden">
          <span
            className="cursor-pointer"
            onClick={toggleDone}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            {doneAt ? <IconCheckBox /> : <IconUncheckBox />}
          </span>
          <span
            className={clsx('cursor-pointer truncate pr-1 text-md', {
              'line-through': !!doneAt,
            })}
            onClick={toggleDone}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            {name}
          </span>
          <p className="ml-auto flex items-center gap-1 text-xs text-text-default sm:ml-2">
            <IconComment />
            {commentCount}
          </p>
        </div>
        <TaskCardDropdown
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
        />
      </div>
      <DateRepeatInfo
        date={date}
        frequency={frequency}
        startDate={startDate}
        showStartTime={false}
      />
    </div>
  );
}
