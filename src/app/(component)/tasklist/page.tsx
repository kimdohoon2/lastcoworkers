'use client';

import { useState } from 'react';
import DatePicker from '@/app/components/tasklist/DatePicker';
import TaskCardList from '@/app/components/tasklist/TaskCardList';
import CreateTaskModal from '@/app/components/tasklist/CreateTaskModal';
import useModal from '@/app/hooks/useModal';
import Button from '@/app/components/common/button/Button';

function TaskListPage() {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );
  return (
    <div className="mx-auto mt-24 flex w-full max-w-[75rem] flex-col gap-6 px-3.5 tablet:px-6">
      <p className="text-xl">할 일</p>
      <DatePicker
        selectedDate={selectedDate}
        onDateChange={(date: Date) =>
          setSelectedDate(date.toISOString().split('T')[0])
        }
      />
      <TaskCardList groupId={1771} taskListId={2874} date={selectedDate} />
      <Button
        variant="plus"
        size="plus"
        className="fixed bottom-6 right-6 z-20 text-text-inverse"
        onClick={openModal}
      >
        + 할 일 추가
      </Button>
      {isOpen && <CreateTaskModal onClose={closeModal} />}
    </div>
  );
}

export default TaskListPage;
