'use client';

import useClickOutside from '@/app/hooks/useClickOutside';
import { useRef } from 'react';

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function TaskDetailDrawer({ isOpen, onClose }: TaskDetailDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(drawerRef, onClose);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0" />

      <div
        ref={drawerRef}
        className={`fixed right-0 top-[3.75rem] z-30 h-full w-[23.4375rem] border border-[rgba(248,250,252,0.1)] bg-background-secondary md:w-[27.1875rem] xl:w-[48.6875rem] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-4 p-4 tablet:p-6 xl:p-10">
          <button onClick={onClose} className="text-left">
            ✖
          </button>

          <p>할 일 정보 상세 내용 들어올 예정</p>
        </div>
      </div>
    </>
  );
}

export default TaskDetailDrawer;
