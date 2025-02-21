import clsx from 'clsx';
import { useState, useRef } from 'react';
import useCloseOnOutsideClickAndEsc from '@/app/hooks/useCloseOnOutsideClickAndEsc';
import Input from '@/app/components/common/input/Input';
import TimeSelector from '@/app/components/tasklist/TimeSelector';
import CustomCalendar from '@/app/components/tasklist/CustomCalendar';
import { formatDateISO } from '@/app/utils/formatDate';

interface DateTimeSelectorProps {
  date: string | undefined;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  disablePastDates?: boolean;
}

export default function DateTimeSelector({
  date,
  time,
  onDateChange,
  onTimeChange,
  disablePastDates = false,
}: DateTimeSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const timeSelectorRef = useRef<HTMLDivElement>(null);

  useCloseOnOutsideClickAndEsc(calendarRef, () => setIsCalendarOpen(false));
  useCloseOnOutsideClickAndEsc(timeSelectorRef, () =>
    setIsTimeSelectorOpen(false),
  );

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
    setIsTimeSelectorOpen(false);
  };

  const toggleTimeSelector = () => {
    setIsTimeSelectorOpen((prev) => !prev);
    setIsCalendarOpen(false);
  };

  const handleDateChange = (newDate: Date) => {
    onDateChange(formatDateISO(newDate));
    setIsCalendarOpen(false);
  };

  return (
    <div className="flex justify-between">
      <div ref={calendarRef} className="relative w-[12.75rem]">
        <Input
          name="startDate"
          title="시작 날짜 및 시간 *"
          type="text"
          placeholder="시작 날짜"
          autoComplete="off"
          value={date || ''}
          onClick={toggleCalendar}
          readOnly
        />
        <div className="mt-2">
          {isCalendarOpen && (
            <CustomCalendar
              selectedDate={date ? new Date(date) : new Date()}
              onDateChange={(newDate) => {
                handleDateChange(newDate);
                setIsCalendarOpen(false);
              }}
              minDate={disablePastDates ? new Date() : undefined}
            />
          )}
        </div>
      </div>

      <div
        ref={timeSelectorRef}
        className={clsx({ 'mb-[13rem]': isTimeSelectorOpen })}
      >
        <TimeSelector
          isOpen={isTimeSelectorOpen}
          onToggle={toggleTimeSelector}
          onClose={() => setIsTimeSelectorOpen(false)}
          selectedTime={time}
          onTimeSelect={(newTime) => {
            onTimeChange(newTime);
            setIsTimeSelectorOpen(false);
          }}
        />
      </div>
    </div>
  );
}
