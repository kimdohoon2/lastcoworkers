import { useTaskQuery } from '@/app/lib/task/getTask';
import { formatDateShort } from '@/app/utils/formatDate';
import DateRepeatInfo from '../tasklist/DateRepeatInfo';
import Button from '../common/button/Button';
import IconCheck from '../icons/IconCheck';
import TaskDetailProfile from '../icons/TaskDetailProfile';
import IconCancel from '../icons/IconCancel';

interface TaskDetailProps {
  groupId: number;
  taskListId: number;
  taskId: number | undefined;
}
function TaskDetail({ groupId, taskListId, taskId }: TaskDetailProps) {
  const {
    data: task,
    isLoading,
    error,
  } = useTaskQuery(groupId, taskListId, taskId as number);
  if (!taskId) {
    return <p>할 일 ID가 없습니다.</p>;
  }

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  if (!task) {
    return <p>데이터가 존재하지 않습니다.</p>;
  }

  const { name, doneAt, date, frequency, description, writer, recurring } =
    task;
  const startDate = recurring?.startDate;
  const createDate = recurring?.createdAt;

  const buttonPosition =
    'fixed bottom-6 right-4 tablet:bottom-5 tablet:right-6 xl:bottom-10 xl:right-10';

  return (
    <div className="p-4 tablet:p-6 xl:p-10">
      <div className="flex flex-col gap-3">
        <button>
          <IconCancel />
        </button>
        {doneAt ? (
          <p className="flex items-center gap-1.5 text-xs text-brand-tertiary">
            <IconCheck />
            완료
          </p>
        ) : (
          ''
        )}
        <div className="flex flex-col gap-4">
          <span className={`text-xl ${doneAt ? 'line-through' : ''}`}>
            {name}
          </span>

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

        {doneAt ? (
          <Button variant="cancel" size="cancel" className={buttonPosition}>
            <IconCheck />
            완료 취소하기
          </Button>
        ) : (
          <Button variant="complete" size="complete" className={buttonPosition}>
            <IconCheck />
            완료하기
          </Button>
        )}
      </div>
    </div>
  );
}

export default TaskDetail;
