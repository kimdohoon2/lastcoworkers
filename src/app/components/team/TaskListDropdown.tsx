'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { editTaskList } from '@/app/lib/tasklist/patchTaskList';
import { deleteTaskList } from '@/app/lib/tasklist/deleteTaskList';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import useDropdown from '@/app/hooks/useDropdown';
import Modal from '@/app/components/common/modal/Modal';
import Button from '@/app/components/common/button/Button';
import Input from '@/app/components/common/input/Input';
import TaskCardDropdown from '@/app/components/icons/TaskCardDropdown';
import useModal from '@/app/hooks/useModal';
import IconAlert from '@/app/components/icons/IconAlert';

interface DropdownMenuProps {
  groupId: number;
  taskListId: number;
  taskListName: string;
}

export default function TaskListDropdown({
  groupId,
  taskListId,
  taskListName,
}: DropdownMenuProps) {
  const {
    isOpen: isDropdownOpen,
    toggleDropdown,
    closeDropdown,
  } = useDropdown();
  const editModal = useModal();
  const deleteModal = useModal();
  const methods = useForm<{ name: string }>();
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (newName: string) =>
      editTaskList({ groupId, id: taskListId, name: newName }),
    onSuccess: () => {
      queryClient.invalidateQueries(['taskLists', groupId]);
      editModal.closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTaskList({ groupId, id: taskListId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['taskLists', groupId]);
      deleteModal.closeModal();
    },
  });

  const handleEditSubmit = (data: { name: string }) => {
    editMutation.mutate(data.name);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <Dropdown className="relative flex items-center" onClose={closeDropdown}>
        <DropdownToggle onClick={toggleDropdown}>
          <TaskCardDropdown />
        </DropdownToggle>
        <DropdownList
          className="absolute right-4 top-6 w-28"
          isOpen={isDropdownOpen}
        >
          <DropdownItem className="text-center" onClick={editModal.openModal}>
            수정하기
          </DropdownItem>
          <DropdownItem
            className="text-center text-red-500"
            onClick={deleteModal.openModal}
          >
            삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>

      <Modal isOpen={editModal.isOpen} closeModal={editModal.closeModal}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleEditSubmit)}>
            <div className="flex w-[280px] flex-col gap-6">
              <div className="text-center text-lg font-medium">
                할 일 목록 수정
              </div>
              <Input
                name="name"
                type="text"
                defaultValue={taskListName}
                placeholder="새 목록 이름을 입력해주세요."
                autoComplete="off"
                validationRules={{ required: '목록 이름을 입력해주세요.' }}
              />
              <Button
                className="mt-2 w-full text-text-inverse"
                variant="primary"
                size="large"
                type="submit"
                disabled={editMutation.isLoading}
              >
                {editMutation.isLoading ? '수정 중...' : '수정하기'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>

      <Modal isOpen={deleteModal.isOpen} closeModal={deleteModal.closeModal}>
        <div className="flex flex-col items-center">
          <IconAlert />
          <div className="mt-4 flex w-[239px] flex-col items-center">
            <h2 className="mb-4 text-lg font-light">
              해당 목록 삭제를 진행하시겠어요?
            </h2>
            <p className="mb-6 text-center text-md font-bold text-red-500">
              {taskListName}
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={deleteModal.closeModal}
              variant="secondary"
              className="w-[8.5rem]"
            >
              닫기
            </Button>
            <Button
              onClick={handleDelete}
              variant="danger"
              className="w-[8.5rem]"
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? '삭제 중...' : '삭제하기'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
