'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useCloseOnOutsideClickAndEsc from '@/app/hooks/useCloseOnOutsideClickAndEsc';
import TaskDetail from '@/app/components/taskdetail/TaskDetail';

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  taskListId: number;
  taskId: number | undefined;
}

function TaskDetailDrawer({
  isOpen,
  onClose,
  groupId,
  taskListId,
  taskId,
}: TaskDetailDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const closeDrawer = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setShouldRender(false);
      onClose();

      return;
    }
    setShouldRender(false);
    onClose();
  };

  useCloseOnOutsideClickAndEsc(drawerRef, () => {
    if (!isModalOpen) closeDrawer();
  });

  return (
    <AnimatePresence>
      {shouldRender && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/30 transition-opacity"
            onClick={closeDrawer}
          />
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            className="fixed right-0 top-[3.75rem] z-30 h-full w-[23.4375rem] border border-[rgba(248,250,252,0.1)] bg-background-secondary md:w-[27.1875rem] xl:w-[48.6875rem]"
            onAnimationComplete={() => {
              if (!shouldRender) onClose();
            }}
          >
            <TaskDetail
              groupId={groupId}
              taskListId={taskListId}
              taskId={taskId}
              onClose={closeDrawer}
              setIsModalOpen={setIsModalOpen}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TaskDetailDrawer;
