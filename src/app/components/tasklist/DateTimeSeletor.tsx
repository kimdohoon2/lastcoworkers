import { useState, useRef } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import Input from '../common/input/Input';
import CustomCalendar from './CustomCalendar';
import TimeSelector from './TimeSelector';

interface DateTimeSelectorProps {
  date: string | undefined;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function DateTimeSelector({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimeSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const timeSelectorRef = useRef<HTMLDivElement>(null);

  useClickOutside(calendarRef, () => setIsCalendarOpen(false));
  useClickOutside(timeSelectorRef, () => setIsTimeSelectorOpen(false));

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => {
      if (!prev) setIsTimeSelectorOpen(false);
      return !prev;
    });
  };

  const toggleTimeSelector = () => {
    setIsTimeSelectorOpen((prev) => {
      if (!prev) setIsCalendarOpen(false);
      return !prev;
    });
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
                const formattedDate = newDate.toISOString().split('T')[0];
                onDateChange(formattedDate);
                setIsCalendarOpen(false);
              }}
            />
          )}
        </div>
      </div>

      <div
        ref={timeSelectorRef}
        className={`${isTimeSelectorOpen ? 'mb-[13rem]' : ''}`}
      >
        <TimeSelector
          isOpen={isTimeSelectorOpen}
          onToggle={toggleTimeSelector}
          onClose={() => setIsTimeSelectorOpen(false)}
          selectedTime={time}
          onTimeSelect={(time) => {
            onTimeChange(time);
            setIsTimeSelectorOpen(false);
          }}
        />
      </div>
    </div>
  );
}
