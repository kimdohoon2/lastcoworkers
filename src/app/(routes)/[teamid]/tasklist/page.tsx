'use client';

import { useState } from 'react';
import DatePicker from '@/app/components/tasklist/DatePicker';
import TaskCardList from '@/app/components/tasklist/TaskCardList';
import CreateTaskModal from '@/app/components/tasklist/CreateTaskModal';
import useModal from '@/app/hooks/useModal';
import Button from '@/app/components/common/button/Button';
import CreateListModal from '@/app/components/tasklist/CreateListModal';

function TaskListPage() {
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<'list' | 'task' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  const handleOpenModal = (type: 'task' | 'list') => {
    setModalType(type);
    openModal();
  };

  return (
    <div className="mx-auto mt-24 flex w-full max-w-[75rem] flex-col gap-6 px-3.5 tablet:px-6">
      <p className="text-xl">할 일</p>
      <div className="flex justify-between">
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={(date: Date) =>
            setSelectedDate(date.toISOString().split('T')[0])
          }
        />
        <button
          className="text-md text-brand-primary hover:text-interaction-hover"
          onClick={() => handleOpenModal('list')}
        >
          + 새로운 목록 추가하기
        </button>
      </div>
      <TaskCardList groupId={1771} taskListId={2874} date={selectedDate} />
      <Button
        variant="plus"
        size="plus"
        className="fixed bottom-6 right-6 z-20 text-text-inverse"
        onClick={() => handleOpenModal('task')}
      >
        + 할 일 추가
      </Button>
      {isOpen && modalType === 'list' && (
        <CreateListModal onClose={closeModal} />
      )}
      {isOpen && modalType === 'task' && (
        <CreateTaskModal onClose={closeModal} />
      )}
    </div>
  );
}

export default TaskListPage;
