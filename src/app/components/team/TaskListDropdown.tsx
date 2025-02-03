import React, { useState } from 'react';
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

interface DropdownMenuProps {
  groupId: number;
  taskListId: number;
}

export default function TaskListDropdown({
  groupId,
  taskListId,
}: DropdownMenuProps) {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);
  const methods = useForm<{ name: string }>();
  const queryClient = useQueryClient();

  const openModal = (type: 'edit' | 'delete') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const editMutation = useMutation({
    mutationFn: (newName: string) =>
      editTaskList({ groupId, id: taskListId, name: newName }),
    onSuccess: () => {
      queryClient.invalidateQueries(['taskLists', groupId]);
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTaskList({ groupId, id: taskListId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['taskLists', groupId]);
      closeModal();
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
        <DropdownList className="absolute right-4 top-6 w-28" isOpen={isOpen}>
          <DropdownItem
            className="text-center"
            onClick={() => openModal('edit')}
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            className="text-center text-red-500"
            onClick={() => openModal('delete')}
          >
            삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>

      {modalType === 'edit' && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleEditSubmit)}>
              <div className="flex w-[280px] flex-col gap-6">
                <div className="text-center text-lg font-medium">
                  할 일 목록 수정
                </div>
                <Input
                  name="name"
                  type="text"
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
      )}

      {modalType === 'delete' && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <div className="flex w-[280px] flex-col gap-6">
            <div className="text-center text-lg font-medium">
              할 일 목록 삭제
            </div>
            <p className="text-center text-md">이 목록을 삭제하시겠습니까?</p>
            <div className="flex gap-4">
              <Button
                className="w-1/2"
                variant="secondary"
                size="large"
                onClick={closeModal}
              >
                취소
              </Button>
              <Button
                className="w-1/2 text-text-inverse"
                variant="danger"
                size="large"
                onClick={handleDelete}
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? '삭제 중...' : '삭제하기'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
