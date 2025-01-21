'use client';

import { useRef, useState } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import IconPrevDate from '@/app/components/icons/IconPrevDate';
import IconNextDate from '@/app/components/icons/IconNextDate';
import IconCalendar from '@/app/components/icons/IconCalendar';
import CustomCalendar from './CustomCalendar';

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useClickOutside(calendarRef, () => setIsCalendarOpen(false));

  const handlePrevDate = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDate = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const toggleCalendar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCalendarOpen((prev) => !prev);
  };

  return (
    <div className="flex-col">
      <div className="relative flex items-center">
        <div className="w-28 text-center">
          {selectedDate.toLocaleDateString('ko-KR', {
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

        {isCalendarOpen && (
          <div ref={calendarRef} className="absolute top-full z-10 mt-2">
            <CustomCalendar
              selectedDate={selectedDate}
              onDateChange={(date) => {
                setSelectedDate(date);
                setIsCalendarOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
