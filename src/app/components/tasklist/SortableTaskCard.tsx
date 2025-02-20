'use client';

import clsx from 'clsx';
import { Task } from '@/app/types/task';
import { useSortable } from '@dnd-kit/sortable';
import TaskCard from '@/app/components/tasklist/TaskCard';

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
    transition: { duration: 150, easing: 'ease-in-out' },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : 'none',
        transition,
        zIndex: isDragging ? 10 : 'auto',
        opacity: isDragging ? 0.8 : 1,
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      {...attributes}
      {...listeners}
      className={clsx('relative cursor-grab active:cursor-grabbing', {
        'pointer-events-none': isDragging,
      })}
    >
      <TaskCard teamId={groupId} taskListId={taskListId} taskId={task.id} />
    </div>
  );
}
