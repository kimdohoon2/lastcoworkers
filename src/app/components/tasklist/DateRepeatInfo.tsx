import { FrequencyType } from '@/app/types/task';
import { formatDate } from '@/app/utils/formatDate';
import { formatToAmPm } from '@/app/utils/formatTime';
import IconRepeat from '@/app/components/icons/IconRepeat';
import IconWatch from '@/app/components/icons/IconWatch';
import VerticalBar from '@/app/components/icons/VerticalBar';
import TaskCardCalendar from '@/app/components/icons/TaskCardCalendar';

interface DateRepeatInfoProps {
  date?: string;
  frequency?: FrequencyType;
  startDate?: string;
  showStartTime?: boolean;
}

const getDateRepeatText = (frequency?: FrequencyType) => {
  switch (frequency) {
    case FrequencyType.DAILY:
      return '매일 반복';
    case FrequencyType.WEEKLY:
      return '매주 반복';
    case FrequencyType.MONTHLY:
      return '매월 반복';
    default:
      return '반복 없음';
  }
};

export default function DateRepeatInfo({
  date,
  frequency,
  startDate,
  showStartTime = false,
}: DateRepeatInfoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1.5">
        <TaskCardCalendar />
        <span className="text-xs text-text-default">{formatDate(date)}</span>
      </div>
      {showStartTime && startDate && (
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
        <span className="text-xs text-text-default">
          {getDateRepeatText(frequency)}
        </span>
      </div>
    </div>
  );
}
