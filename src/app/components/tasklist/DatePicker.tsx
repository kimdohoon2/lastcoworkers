'use client';

import { useRef, useState } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import IconPrevDate from '@/app/components/icons/IconPrevDate';
import IconNextDate from '@/app/components/icons/IconNextDate';
import IconCalendar from '@/app/components/icons/IconCalendar';
import CustomCalendar from './CustomCalendar';

interface DatePickerProps {
  selectedDate: string;
  onDateChange: (date: Date) => void;
}

export default function DatePicker({
  selectedDate,
  onDateChange,
}: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useClickOutside(calendarRef, () => setIsCalendarOpen(false));

  const handlePrevDate = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    onDateChange(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onDateChange(nextDate);
  };

  const toggleCalendar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCalendarOpen((prev) => !prev);
  };

  return (
    <div className="flex-col">
      <div className="relative flex items-center">
        <div className="w-28 text-lg">
          {new Date(selectedDate).toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
            weekday: 'short',
          })}
        </div>
        <div className="mr-3 flex gap-2">
          <button onClick={handlePrevDate}>
            <IconPrevDate />
          </button>
          <button onClick={handleNextDate}>
            <IconNextDate />
          </button>
        </div>

        <button onClick={toggleCalendar}>
          <IconCalendar />
        </button>

        <div
          ref={calendarRef}
          className={`absolute left-40 top-full z-10 mt-2 transform transition-all duration-500 ease-in-out ${
            isCalendarOpen
              ? 'scale-100 opacity-100'
              : 'scale-95·pointer-events-none'
          }`}
        >
          {isCalendarOpen && (
            <CustomCalendar
              selectedDate={new Date(selectedDate)}
              onDateChange={(date) => {
                onDateChange(date);
                setIsCalendarOpen(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
