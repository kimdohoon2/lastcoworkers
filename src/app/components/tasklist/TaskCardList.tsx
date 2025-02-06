'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTasksQuery } from '@/app/lib/task/getTask';
import { useAppDispatch } from '@/app/stores/hooks';
import { setTasks } from '@/app/stores/tasksSlice';
import TaskDetailDrawer from '../taskdetail/TaskDetailDrawer';
import SortableTaskCard from './SortableTaskCard';

function TaskCardList({
  groupId,
  taskListId,
  date,
}: {
  groupId: number;
  taskListId: number;
  date: string;
}) {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useTasksQuery(groupId, taskListId, date);
  const [tasksState, setTasksState] = useState(data || []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setTasksState(data);
      dispatch(setTasks(data));
    }
  }, [data, dispatch]);

  const openDrawer = (taskid: number) => {
    setSelectedTaskId(taskid);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedTaskId(null), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent, taskId: number) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      openDrawer(taskId);
      e.preventDefault();
    }
  };

  // 드래그가 끝나면 호출되는 함수
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasksState.findIndex((task) => task.id === active.id);
    const newIndex = tasksState.findIndex((task) => task.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newTasks = arrayMove(tasksState, oldIndex, newIndex);
      setTasksState(newTasks);
    }
  };

  // 드래그 센서: 10px 이상 이동하면 드래그로 감지
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  if (isLoading) {
    return <div>로딩 중입니다</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!tasksState || tasksState.length === 0) {
    return (
      <div className="mt-[11.9375rem] flex h-screen justify-center text-md text-text-default tablet:mt-[21.5625rem] lg:mt-[19.375rem]">
        아직 할 일이 없습니다. <br /> 할 일을 추가해보세요.
      </div>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext // 정렬 가능한 아이템 포함하는 컨텍스트
        items={tasksState.map((task) => task.id)}
        strategy={verticalListSortingStrategy} // 세로 방향 정렬
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {tasksState.map((task) => (
              <div
                key={task.id}
                role="button"
                tabIndex={0}
                onClick={() => openDrawer(task.id)}
                onKeyDown={(e) => handleKeyDown(e, task.id)}
                className="cursor-pointer rounded-[0.5rem] border border-transparent transition-all duration-200 ease-in-out hover:border-background-inverse"
              >
                <SortableTaskCard
                  task={task}
                  groupId={groupId}
                  taskListId={taskListId}
                />
              </div>
            ))}
          </div>
          {isDrawerOpen && selectedTaskId !== null && (
            <TaskDetailDrawer
              isOpen={isDrawerOpen}
              onClose={closeDrawer}
              groupId={groupId}
              taskListId={taskListId}
              taskId={selectedTaskId}
            />
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default TaskCardList;
