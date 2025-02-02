import React, { useState } from 'react';
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
import { TaskList } from '@/app/types/grouptask';

interface TodoListProps {
  groupId: number;
  taskLists?: { id: number; name: string }[];
}

export default function TodoList({ groupId, taskLists = [] }: TodoListProps) {
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
  const methods = useForm();
  const queryClient = useQueryClient();
  const todayDate = getTodayDate();
  const [localTaskLists, setLocalTaskLists] = useState(taskLists);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['taskLists', groupId],
    queryFn: async () => {
      const responses = await Promise.all(
        localTaskLists.map((taskList) =>
          getTaskList({ groupId, taskListId: taskList.id, date: todayDate }),
        ),
      );
      return responses;
    },
    staleTime: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: (newTaskList: { name: string }) =>
      createTaskList({ groupId, name: newTaskList.name }),
    onSuccess: async (newTaskList: TaskList) => {
      const newTaskListData = await getTaskList({
        groupId,
        taskListId: newTaskList.id,
        date: todayDate,
      });

      setLocalTaskLists((prev) => [
        ...prev,
        { id: newTaskList.id, name: newTaskList.name },
      ]);

      queryClient.setQueryData<GetTaskListResponse[]>(
        ['taskLists', groupId],
        (oldData: GetTaskListResponse[] | undefined) => [
          ...(oldData || []),
          newTaskListData,
        ],
      );

      closeModal();
    },
  });

  const handleCreateTaskList = (taskdata: { name: string }) => {
    mutation.mutate(taskdata);
  };

  return (
    <div className="mx-auto my-6 max-w-[75rem]">
      <div className="flex justify-between">
        <span className="text-lg font-normal">
          할 일 목록 ({localTaskLists.length}개)
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
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? '생성 중...' : '만들기'}
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

      {data &&
        data.map((taskListData: GetTaskListResponse, index: number) => {
          const taskList = localTaskLists[index];
          return (
            <TodoListItem
              key={taskList.id}
              taskList={taskList}
              groupId={groupId}
              backgroundColor={
                backgroundColors[index % backgroundColors.length]
              }
              taskListData={taskListData}
            />
          );
        })}
    </div>
  );
}
