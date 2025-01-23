import { Task } from '@/app/types/task';
import clsx from 'clsx';
import IconComment from '../icons/IconComment';
import IconCheckBox from '../icons/IconCheckBox';
import IconUncheckBox from '../icons/IconUncheckBox';
import DateRepeatInfo from './DateRepeatInfo';
import TaskCardMenu from './TaskCardDropdown';

export default function TaskCard({ task }: { task: Task }) {
  const { name, commentCount, doneAt, date, frequency } = task;

  return (
    <div className="flex flex-col gap-2.5 rounded-lg bg-background-secondary px-3.5 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-grow items-center gap-2">
          {doneAt ? <IconCheckBox /> : <IconUncheckBox />}
          <h3 className={clsx('pr-1 text-md', { 'line-through': doneAt })}>
            {name}
          </h3>
          <p className="ml-auto flex items-center gap-1 text-xs text-text-default sm:ml-2">
            <IconComment />
            {commentCount}
          </p>
        </div>
        <TaskCardMenu />
      </div>
      <DateRepeatInfo date={date} frequency={frequency} />
    </div>
  );
}
