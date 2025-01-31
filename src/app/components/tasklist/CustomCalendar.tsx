'use client';

import '@/app/styles/calendar.css';
import Calendar from 'react-calendar';
import CalendarPrevArrow from '@/app/components/icons/CalendarPrevArrow';
import CalendarNextArrow from '@/app/components/icons/CalendarNextArrow';

interface CustomCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function CustomCalendar({
  selectedDate,
  onDateChange,
}: CustomCalendarProps) {
  return (
    <>
      <Calendar
        calendarType="gregory"
        value={selectedDate}
        onChange={(date) => {
          if (date instanceof Date) {
            onDateChange(date);
          }
        }}
        next2Label={null}
        prev2Label={null}
        prevLabel={<CalendarPrevArrow />}
        nextLabel={<CalendarNextArrow />}
        minDetail="month"
        locale="en-US"
        className="z-20"
      />
    </>
  );
}
