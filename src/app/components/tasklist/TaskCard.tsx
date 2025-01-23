import { Task } from '@/app/types/task';
import TaskCardCalendar from '../icons/TaskCardCalendar';
import IconRepeat from '../icons/IconRepeat';
import IconComment from '../icons/IconComment';
import IconCheckBox from '../icons/IconCheckBox';
import VerticalBar from '../icons/VerticalBar';
import IconUncheckBox from '../icons/IconUncheckBox';

export default function TaskCard({ task }: { task: Task }) {
  const { name, commentCount, date, frequency, doneAt } = task;

  const formatDate = (selectDate: string) => {
    return new Date(selectDate).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col gap-2.5 rounded-lg bg-background-secondary px-3.5 py-3">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          {doneAt ? <IconCheckBox /> : <IconUncheckBox />}
          <h3>{name}</h3>
          <p className="text-default flex items-center gap-1 text-xs">
            <IconComment />
            {commentCount}
          </p>
        </div>
        {/* 수정/삭제 드롭다운 */}
      </div>
      <div className="flex items-center gap-2.5">
        <div className="text-default flex items-center gap-2">
          <TaskCardCalendar />
          {formatDate(date)}
        </div>
        <VerticalBar />
        <div className="flex items-center gap-1.5">
          <IconRepeat />
          {frequency}
        </div>
      </div>
    </div>
  );
}
