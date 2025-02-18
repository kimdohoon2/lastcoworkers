'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '@/app/types/task';
import { setTasks } from '@/app/stores/tasksSlice';
import { useAppDispatch } from '@/app/stores/hooks';
import { useEditTaskOrderMutation } from '@/app/lib/task/patchTask';
import SortableTaskCard from '@/app/components/tasklist/SortableTaskCard';
import TaskDetailDrawer from '@/app/components/taskdetail/TaskDetailDrawer';

interface TaskCardListProps {
  groupId: number;
  taskListId: number;
  taskListData: Task[];
}

function TaskCardList({
  groupId,
  taskListId,
  taskListData,
}: TaskCardListProps) {
  const dispatch = useAppDispatch();
  const { mutate: editTaskOrderMutation } = useEditTaskOrderMutation();

  const [tasksState, setTasksState] = useState<Task[]>(taskListData || []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    if (taskListData && Array.isArray(taskListData)) {
      setTasksState(taskListData);
      dispatch(setTasks(taskListData));
    }
  }, [taskListData, dispatch]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasksState.findIndex((task) => task.id === active.id);
    const newIndex = tasksState.findIndex((task) => task.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newTasks = arrayMove(tasksState, oldIndex, newIndex);
      setTasksState(newTasks);

      editTaskOrderMutation({
        groupId,
        taskListId,
        id: Number(active.id),
        displayIndex: newIndex,
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
  );

  return tasksState.length === 0 ? (
    <div className="mt-[12rem] flex justify-center text-md text-text-default tablet:mt-[18rem]">
      아직 할 일이 없습니다. <br /> 할 일을 추가해보세요.
    </div>
  ) : (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasksState.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-6 overflow-hidden pb-[5.5rem]">
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
