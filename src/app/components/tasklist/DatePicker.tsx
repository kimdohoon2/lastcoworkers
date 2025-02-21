'use client';

import clsx from 'clsx';
import { useRef, useState } from 'react';
import useCloseOnOutsideClickAndEsc from '@/app/hooks/useCloseOnOutsideClickAndEsc';
import IconPrevDate from '@/app/components/icons/IconPrevDate';
import IconNextDate from '@/app/components/icons/IconNextDate';
import IconCalendar from '@/app/components/icons/IconCalendar';
import CustomCalendar from '@/app/components/tasklist/CustomCalendar';

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

  useCloseOnOutsideClickAndEsc(calendarRef, () => setIsCalendarOpen(false));

  const formattedDate = new Date(selectedDate).toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

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

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  return (
    <div className="flex-col">
      <div className="relative flex items-center">
        <div className="w-28 text-lg">{formattedDate}</div>
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
          className={clsx(
            'absolute left-2 top-full z-10 mt-2 transform transition-all duration-300 ease-in-out tablet:left-40',
            {
              'opacity-100': isCalendarOpen,
              'opacity-0': !isCalendarOpen,
            },
          )}
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
