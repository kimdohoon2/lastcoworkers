'use client';

import { AnimatePresence, motion } from 'framer-motion';
import useClickOutside from '@/app/hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function TaskDetailDrawer({ isOpen, onClose }: TaskDetailDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  const closeDrawer = () => {
    setShouldRender(false);
    setTimeout(onClose, 300);
  };

  useClickOutside(drawerRef, () => closeDrawer());

  return (
    <AnimatePresence>
      {shouldRender && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 bg-black/30 transition-opacity"
            onClick={closeDrawer}
          />

          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            exit={{
              x: '100%',
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            className="fixed right-0 top-[3.75rem] z-30 h-full w-[23.4375rem] border border-[rgba(248,250,252,0.1)] bg-background-secondary md:w-[27.1875rem] xl:w-[48.6875rem]"
            onAnimationComplete={() => {
              if (!shouldRender) onClose();
            }}
          >
            <div className="flex flex-col gap-4 p-4 tablet:p-6 xl:p-10">
              <button onClick={closeDrawer} className="text-left">
                ✖
              </button>
              <p>할 일 정보 상세 내용 들어올 예정</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default TaskDetailDrawer;
