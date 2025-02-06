'use client';

import { useSortable } from '@dnd-kit/sortable'; // 개별 요소 드래그 훅
import { CSS } from '@dnd-kit/utilities';
import TaskCard from '@/app/components/tasklist/TaskCard';
import { Task } from '@/app/types/task';

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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      transition: {
        duration: 150,
        easing: 'ease-in-out',
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // 드래그 이벤트 감지
      className="relative cursor-grab active:cursor-grabbing"
    >
      <TaskCard teamId={groupId} taskListId={taskListId} taskId={task.id} />
    </div>
  );
}
