import { useTaskQuery } from '@/app/lib/task/getTask';
import { formatDateShort } from '@/app/utils/formatDate';
import { Dispatch, SetStateAction } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useEditTaskMutation } from '@/app/lib/task/patchTask';
import DateRepeatInfo from '../tasklist/DateRepeatInfo';
import Button from '../common/button/Button';
import IconCheck from '../icons/IconCheck';
import TaskDetailProfile from '../icons/TaskDetailProfile';
import IconCancel from '../icons/IconCancel';
import TaskDetailMenu from './TaskDetailDropdown';

interface TaskDetailProps {
  groupId: number;
  taskListId: number;
  taskId: number | undefined;
  onClose: () => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
function TaskDetail({
  groupId,
  taskListId,
  taskId,
  onClose,
  setIsModalOpen,
}: TaskDetailProps) {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useEditTaskMutation();

  const {
    data: task,
    isLoading,
    error,
  } = useTaskQuery(groupId, taskListId, taskId as number);
  if (!taskId) {
    return <p>할 일 ID가 없습니다.</p>;
  }

  if (isLoading) return <p>로딩 중</p>;
  if (error) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  if (!task) return <p>데이터가 존재하지 않습니다.</p>;

  const { name, doneAt, date, frequency, description, writer, recurring } =
    task;
  const startDate = recurring?.startDate;
  const createDate = recurring?.createdAt;

  const toggleDone = () => {
    editTask(
      {
        groupId,
        taskListId,
        taskId,
        name,
        description,
        done: !doneAt,
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

  return (
    <div className="p-4 tablet:p-6 xl:p-10">
      <div className="flex flex-col gap-3">
        <button className="h-6 w-6" onClick={onClose}>
          <IconCancel />
        </button>
        {doneAt && (
          <p className="flex items-center gap-1.5 text-xs text-brand-tertiary">
            <IconCheck /> 완료
          </p>
        )}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className={`text-xl ${doneAt ? 'line-through' : ''}`}>
              {name}
            </span>
            <TaskDetailMenu
              taskId={taskId}
              setIsModalOpen={setIsModalOpen}
              onDeleteSuccess={onClose}
            />
          </div>

          <div className="flex items-center justify-between text-md">
            <div className="flex items-center gap-3">
              {writer.image ? writer.image : <TaskDetailProfile />}
              <p className="text-md">{writer.nickname}</p>
            </div>
            <p className="text-text-secondary">{formatDateShort(createDate)}</p>
          </div>
          <DateRepeatInfo
            date={date}
            frequency={frequency}
            startDate={startDate}
            showStartDate
          />
        </div>

        <p className="mt-3 break-words">{description}</p>

        <Button
          variant={doneAt ? 'cancel' : 'complete'}
          size={doneAt ? 'cancel' : 'complete'}
          className="fixed bottom-6 right-4 tablet:bottom-5 tablet:right-6 xl:bottom-10 xl:right-10"
          onClick={toggleDone}
        >
          <IconCheck />
          {doneAt ? '완료 취소하기' : '완료하기'}
        </Button>
      </div>
    </div>
  );
}

export default TaskDetail;
