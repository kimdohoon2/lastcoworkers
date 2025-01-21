'use client';

import '@/app/styles/calendar.css';
import Calendar from 'react-calendar';
import CalendarPrevArrow from '@/app/components/icons/CalendarPrevArrow';
import CalendarNextArrow from '@/app/components/icons/CalendarNextArrow';

export default function CustomCalendar() {
  return (
    <>
      <Calendar
        calendarType="gregory"
        next2Label={null}
        prev2Label={null}
        prevLabel={<CalendarPrevArrow />}
        nextLabel={<CalendarNextArrow />}
        minDetail="month"
        locale="en-US"
        className="absolute z-10"
      />
    </>
  );
}
