'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import getTaskList from '@/app/lib/group/getTaskList';
import { createTaskList } from '@/app/lib/tasklist/postTaskList';
import TodoListItem from '@/app/components/team/TodoListItem';
import getTodayDate from '@/app/utils/getTodayDate';
import useModal from '@/app/hooks/useModal';
import Modal from '@/app/components/common/modal/Modal';
import Button from '@/app/components/common/button/Button';
import Input from '@/app/components/common/input/Input';
import { useForm, FormProvider } from 'react-hook-form';
import { GroupTask } from '@/app/types/grouptask';
import { editTaskListOrder } from '@/app/lib/tasklist/patchTaskList';

interface TodoListProps {
  groupId: number;
  taskLists: GroupTask[];
}

interface TodoListForm {
  name: string;
}

export default function TodoList({ groupId, taskLists }: TodoListProps) {
  const backgroundColors = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
    'bg-point-rose',
    'bg-point-orange',
    'bg-point-yellow',
  ];
  const { isOpen, openModal, closeModal } = useModal();
  const methods = useForm<TodoListForm>();
  const { setError } = methods;
  const queryClient = useQueryClient();
  const todayDate = getTodayDate();

  const [items, setItems] = useState<GroupTask[]>(taskLists);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    setItems(taskLists);
  }, [taskLists]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['taskLists', groupId],
    queryFn: async () => {
      const responses = await Promise.all(
        items.map((taskList) =>
          getTaskList({ groupId, taskListId: taskList.id, date: todayDate }),
        ),
      );
      return responses;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    enabled: items.length > 0,
  });

  const createMutation = useMutation({
    mutationFn: (newTaskList: { name: string }) =>
      createTaskList({ groupId, name: newTaskList.name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskLists', groupId] });
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      methods.reset();
      closeModal();
    },
    onError: () => {
      alert('그룹 내 이름이 같은 할 일 목록이 존재합니다.');
    },
  });

  const handleCreateTaskList = (newData: { name: string }) => {
    createMutation.mutate(newData);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      editTaskListOrder({
        groupId,
        id: Number(active.id),
        displayIndex: newIndex,
      });
    }
    setActiveId(null);
  };

  return (
    <div className="mx-auto my-6 max-w-[75rem]">
      <div className="flex justify-between">
        <span className="text-lg font-normal">
          할 일 목록 ({items.length}개)
        </span>
        <button
          className="text-sm font-normal text-brand-primary"
          onClick={openModal}
        >
          + 새로운 목록 추가하기
        </button>

        <Modal isOpen={isOpen} closeModal={closeModal}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleCreateTaskList)}>
              <div className="flex w-[280px] flex-col gap-6">
                <div className="text-center text-lg font-medium">
                  할 일 목록 추가
                </div>
                <Input
                  name="name"
                  type="text"
                  placeholder="목록 이름을 입력해주세요."
                  autoComplete="off"
                  validationRules={{ required: '목록 이름을 입력해주세요.' }}
                />
                <Button
                  className="mt-2 w-full text-text-inverse"
                  variant="primary"
                  size="large"
                  type="submit"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? '생성 중...' : '만들기'}
                </Button>
              </div>
            </form>
          </FormProvider>
        </Modal>
      </div>

      {isLoading && <div className="my-4">로딩 중...</div>}
      {isError && (
        <div className="my-4 text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      )}

      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col overflow-visible">
            {items.map((taskList, index) => (
              <TodoListItem
                key={taskList.id}
                id={taskList.id}
                taskList={taskList}
                groupId={groupId}
                backgroundColor={
                  backgroundColors[index % backgroundColors.length]
                }
                taskListData={data?.[index] || { tasks: [] }}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="w-full">
              {(() => {
                const activeIndex = items.findIndex(
                  (item) => item.id === activeId,
                );
                const overlayBg =
                  activeIndex !== -1
                    ? backgroundColors[activeIndex % backgroundColors.length]
                    : 'bg-gray-500';
                return (
                  <TodoListItem
                    id={activeId}
                    taskList={
                      items.find((item) => item.id === activeId) as GroupTask
                    }
                    groupId={groupId}
                    backgroundColor={overlayBg}
                    taskListData={
                      data?.[
                        items.findIndex((item) => item.id === activeId)
                      ] || {
                        tasks: [],
                      }
                    }
                  />
                );
              })()}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
