'use client';

import { useSortable } from '@dnd-kit/sortable'; // 개별 요소 드래그 훅
import TaskCard from '@/app/components/tasklist/TaskCard';
import { Task } from '@/app/types/task';
import clsx from 'clsx';

interface SortableTaskCardProps {
  task: Task;
  groupId: number;
  taskListId: number;
}

export default function SortableTaskCard({
  task,
  groupId,
  taskListId,
}: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    transition: {
      duration: 150,
      easing: 'ease-in-out',
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : 'none',
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // 드래그 이벤트 감지
      className={clsx('relative cursor-grab active:cursor-grabbing', {
        'pointer-events-none': isDragging,
      })}
    >
      <TaskCard teamId={groupId} taskListId={taskListId} taskId={task.id} />
    </div>
  );
}
