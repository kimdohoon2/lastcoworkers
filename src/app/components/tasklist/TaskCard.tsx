import { Task } from '@/app/types/task';
import clsx from 'clsx';
import { useEditTaskMutation } from '@/app/lib/task/patchTask';
import { useQueryClient } from '@tanstack/react-query';
import IconComment from '../icons/IconComment';
import IconCheckBox from '../icons/IconCheckBox';
import IconUncheckBox from '../icons/IconUncheckBox';
import DateRepeatInfo from './DateRepeatInfo';
import TaskCardMenu from './TaskCardDropdown';

export default function TaskCard({ task }: { task: Task }) {
  const {
    id: taskId,
    name,
    commentCount,
    doneAt,
    date,
    frequency,
    recurringId,
    description,
  } = task;

  const groupId = 1771;
  const taskListId = 2874;

  const queryClient = useQueryClient();
  const { mutate: editTask } = useEditTaskMutation();

  const toggleDone = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();

    const updatedDoneStatus = !doneAt;

    editTask(
      {
        groupId,
        taskListId,
        taskId,
        name,
        description: '',
        done: updatedDoneStatus,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          className={clsx('flex flex-grow cursor-pointer items-center gap-2')}
          onClick={toggleDone}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          {doneAt ? <IconCheckBox /> : <IconUncheckBox />}
          <h3 className={clsx('pr-1 text-md', { 'line-through': !!doneAt })}>
            {name}
          </h3>
          <p className="ml-auto flex items-center gap-1 text-xs text-text-default sm:ml-2">
            <IconComment />
            {commentCount}
          </p>
        </div>
        <TaskCardMenu
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
          taskName={name}
          recurringId={recurringId}
          description={description}
        />
      </div>
      <DateRepeatInfo date={date} frequency={frequency} />
    </div>
  );
}
