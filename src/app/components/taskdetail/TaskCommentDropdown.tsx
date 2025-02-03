import useDropdown from '@/app/hooks/useDropdown';
import { useAppSelector } from '@/app/stores/hooks';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteTaskCommentMutation } from '@/app/lib/comment/deleteComment';
import { useQueryClient } from '@tanstack/react-query';
import Dropdown from '../common/dropdown/Dropdown';
import DropdownItem from '../common/dropdown/DropdownItem';
import DropdownList from '../common/dropdown/DropdownList';
import DropdownToggle from '../common/dropdown/DropdownToggle';
import TaskCardDropdown from '../icons/TaskCardDropdown';

export default function TaskCommentMenu({
  taskId,
  commentId,
  onEdit,
  setIsModalOpen,
}: {
  taskId: number;
  commentId: number;
  onEdit: () => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const task = useAppSelector((state) => state.tasks.taskById[taskId]);
  const { mutate: deleteComment } = useDeleteTaskCommentMutation();

  const {
    isOpen: isDropdownOpen,
    toggleDropdown,
    closeDropdown,
  } = useDropdown();

  if (!task) return null;

  const handleDelete = () => {
    deleteComment(
      { taskId, commentId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['tasks', taskId, 'comments'],
          });
          closeDropdown();
        },
        onError: () => {
          console.error('댓글 삭제 실패');
        },
      },
    );
  };

  return (
    <>
      <Dropdown onClose={closeDropdown}>
        <DropdownToggle onClick={toggleDropdown}>
          <TaskCardDropdown />
        </DropdownToggle>
        <DropdownList
          isOpen={isDropdownOpen}
          className="absolute right-0 w-[5.875rem] overflow-hidden border sm:w-[7.5rem]"
        >
          <DropdownItem
            className="text-sm"
            onClick={() => {
              setIsModalOpen(true);
              onEdit();
              closeDropdown();
            }}
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            className="text-sm"
            onClick={() => {
              handleDelete();
            }}
          >
            삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </>
  );
}
