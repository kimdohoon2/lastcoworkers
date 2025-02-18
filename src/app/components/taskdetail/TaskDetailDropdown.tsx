import useDropdown from '@/app/hooks/useDropdown';
import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@/app/stores/hooks';
import useModal from '@/app/hooks/useModal';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import TaskCardDropdown from '@/app/components/icons/TaskCardDropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DeleteTaskModal from '@/app/components/tasklist/DeleteTaskModal';
import DeleteRecurringModal from '@/app/components/tasklist/DeleteRecurringModal';

export default function TaskDetailDropdown({
  groupId,
  taskListId,
  taskId,
  setIsModalOpen,
  onDeleteSuccess,
  onEdit,
}: {
  groupId: number;
  taskListId: number;
  taskId: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
  onEdit: () => void;
}) {
  const task = useAppSelector((state) => state.tasks.taskById[taskId]);

  const deleteTaskModal = useModal();
  const deleteRecurringModal = useModal();

  const {
    isOpen: isDropdownOpen,
    toggleDropdown,
    closeDropdown,
  } = useDropdown();

  if (!task) return null;

  return (
    <>
      <Dropdown onClose={closeDropdown}>
        <DropdownToggle onClick={toggleDropdown}>
          <TaskCardDropdown />
        </DropdownToggle>
        <DropdownList
          isOpen={isDropdownOpen}
          className="absolute right-0 w-[7rem] overflow-hidden border sm:w-[7.5rem]"
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
              deleteTaskModal.openModal();
              setIsModalOpen(true);
              closeDropdown();
            }}
          >
            단일 삭제하기
          </DropdownItem>
          <DropdownItem
            className="text-sm"
            onClick={() => {
              deleteRecurringModal.openModal();
              setIsModalOpen(true);
              closeDropdown();
            }}
          >
            반복 삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>

      <DeleteTaskModal
        isOpen={deleteTaskModal.isOpen}
        onClose={() => {
          deleteTaskModal.closeModal();
          setIsModalOpen(false);
        }}
        onDeleteSuccess={onDeleteSuccess}
        groupId={groupId}
        taskListId={taskListId}
        taskId={taskId}
      />

      <DeleteRecurringModal
        isOpen={deleteRecurringModal.isOpen}
        onClose={() => {
          deleteRecurringModal.closeModal();
          setIsModalOpen(false);
        }}
        onDeleteSuccess={onDeleteSuccess}
        groupId={groupId}
        taskListId={taskListId}
        taskId={taskId}
      />
    </>
  );
}
