import { FrequencyType } from '@/app/types/task';
import { formatDate } from '@/app/utils/formatDate';
import IconRepeat from '../icons/IconRepeat';
import TaskCardCalendar from '../icons/TaskCardCalendar';
import VerticalBar from '../icons/VerticalBar';

interface DateRepeatInfoProps {
  date?: string;
  frequency?: FrequencyType;
}

export default function DateRepeatInfo({
  date,
  frequency,
}: DateRepeatInfoProps) {
  const dateRepeat =
    frequency === FrequencyType.DAILY
      ? '매일 반복'
      : frequency === FrequencyType.WEEKLY
        ? '매주 반복'
        : frequency === FrequencyType.MONTHLY
          ? '매월 반복'
          : '반복 없음';

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1.5">
        <TaskCardCalendar />
        <span className="text-xs text-text-default">{formatDate(date)}</span>
      </div>
      <VerticalBar />
      <div className="flex items-center gap-1.5">
        <IconRepeat />
        <span className="text-xs text-text-default">{dateRepeat}</span>
      </div>
    </div>
  );
}
