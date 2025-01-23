'use client';

import { useState } from 'react';
import DatePicker from '@/app/components/tasklist/DatePicker';
import TaskCardList from '@/app/components/tasklist/TaskCardList';

function TaskListPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  return (
    <div className="desktop:px-12 mx-auto mt-24 flex w-full max-w-[75rem] flex-col gap-6 px-3.5 tablet:px-6">
      <p className="text-xl">할 일</p>
      <DatePicker
        selectedDate={selectedDate}
        onDateChange={(date: Date) =>
          setSelectedDate(date.toISOString().split('T')[0])
        }
      />
      <TaskCardList groupId={1771} taskListId={2874} date={selectedDate} />
    </div>
  );
}

export default TaskListPage;
