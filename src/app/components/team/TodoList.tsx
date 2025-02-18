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
import getTaskList, { GetTaskListResponse } from '@/app/lib/group/getTaskList';
import { createTaskList } from '@/app/lib/tasklist/postTaskList';
import TodoListItem from '@/app/components/team/TodoListItem';
import getTodayDate from '@/app/utils/getTodayDate';
import useModal from '@/app/hooks/useModal';
import Modal from '@/app/components/common/modal/Modal';
import Button from '@/app/components/common/button/Button';
import Input from '@/app/components/common/input/Input';
import { useForm, FormProvider } from 'react-hook-form';
import { GroupResponse, GroupTask } from '@/app/types/grouptask';
import { editTaskListOrder } from '@/app/lib/tasklist/patchTaskList';
import { AxiosError } from 'axios';
import TodoListSkeleton from '@/app/components/team/TodoListSkeleton';
import useToast from '@/app/hooks/useToast';

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
  const queryClient = useQueryClient();
  const todayDate = getTodayDate();

  const [items, setItems] = useState<GroupTask[]>(taskLists);
  const [activeId, setActiveId] = useState<number | null>(null);
  const { showToast } = useToast();

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
      const mappedResponses: Record<number, GetTaskListResponse> = {};
      responses.forEach((response, index) => {
        const taskList = items[index];
        mappedResponses[taskList.id] = response;
      });
      return mappedResponses;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    enabled: items.length > 0,
  });

  const createMutation = useMutation({
    mutationFn: (newTaskList: { name: string }) => {
      const trimmedName = newTaskList.name.trim();
      return createTaskList({ groupId, name: trimmedName });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskLists', groupId] });
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      methods.reset();
      closeModal();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        showToast({
          message: '그룹 내 이름이 같은 할 일 목록이 있어요.😃',
          type: 'warning',
        });
      } else {
        showToast({
          message: '할 일 목록 수정에 실패했어요.🙁',
          type: 'error',
        });
      }
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
      queryClient.setQueryData<GroupResponse>(
        ['group', groupId],
        (oldData?: GroupResponse): GroupResponse | undefined => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            taskLists: newItems,
          };
        },
      );
    }
    setActiveId(null);
  };

  if (isError) return null;

  return (
    <div className="mx-auto my-6 max-w-[75rem]">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <span className="text-lg font-medium text-text-primary">
            할 일 목록
          </span>
          <span className="text-lg font-normal text-text-default">
            ({items.length}개)
          </span>
        </div>
        <button
          className="text-sm font-normal text-brand-primary hover:underline"
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
                  validationRules={{
                    required: '목록 이름을 입력해주세요.',
                    maxLength: {
                      value: 30,
                      message: '할 일 제목은 최대 30글자까지 입력 가능합니다.',
                    },
                    validate: (value: string) => {
                      if (value.trim().length === 0) {
                        return '할 일 제목에 공백만 입력할 수 없습니다.';
                      }
                      return true;
                    },
                  }}
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
      {isLoading ? (
        <TodoListSkeleton />
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col overflow-visible">
              {items.map((taskList) => (
                <TodoListItem
                  key={taskList.id}
                  id={taskList.id}
                  taskList={taskList}
                  groupId={groupId}
                  backgroundColor={
                    backgroundColors[taskList.id % backgroundColors.length]
                  }
                  taskListData={data?.[taskList.id] || { tasks: [] }}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <div className="w-full">
                {(() => {
                  const activeTask = items.find((item) => item.id === activeId);
                  const overlayBg = activeTask
                    ? backgroundColors[activeTask.id % backgroundColors.length]
                    : 'bg-gray-500';
                  return (
                    <TodoListItem
                      id={activeId}
                      taskList={activeTask as GroupTask}
                      groupId={groupId}
                      backgroundColor={overlayBg}
                      taskListData={data?.[activeId] || { tasks: [] }}
                    />
                  );
                })()}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
