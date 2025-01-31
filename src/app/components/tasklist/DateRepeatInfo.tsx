import { FrequencyType } from '@/app/types/task';
import { formatDate } from '@/app/utils/formatDate';
import { formatToAmPm } from '@/app/utils/formatTime';
import IconRepeat from '../icons/IconRepeat';
import TaskCardCalendar from '../icons/TaskCardCalendar';
import VerticalBar from '../icons/VerticalBar';
import IconWatch from '../icons/IconWatch';

interface DateRepeatInfoProps {
  date?: string;
  frequency?: FrequencyType;
  startDate?: string;
  showStartDate?: boolean;
}

export default function DateRepeatInfo({
  date,
  frequency,
  startDate,
  showStartDate = false,
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
      {showStartDate && startDate && (
        <>
          <VerticalBar />
          <div className="flex items-center gap-1.5">
            <IconWatch />
            <span className="text-xs text-text-default">
              {formatToAmPm(startDate)}
            </span>
          </div>
        </>
      )}
      <VerticalBar />
      <div className="flex items-center gap-1.5">
        <IconRepeat />
        <span className="text-xs text-text-default">{dateRepeat}</span>
      </div>
    </div>
  );
}
