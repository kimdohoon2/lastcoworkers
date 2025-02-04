import useDropdown from '@/app/hooks/useDropdown';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAppSelector } from '@/app/stores/hooks';
import Dropdown from '../common/dropdown/Dropdown';
import DropdownItem from '../common/dropdown/DropdownItem';
import DropdownList from '../common/dropdown/DropdownList';
import DropdownToggle from '../common/dropdown/DropdownToggle';
import TaskCardDropdown from '../icons/TaskCardDropdown';
import DeleteTaskModal from '../tasklist/DeleteTaskModal';
import DeleteRecurringModal from '../tasklist/DeleteRecurringModal';

export default function TaskDetailMenu({
  taskId,
  setIsModalOpen,
  onDeleteSuccess,
  onEdit,
}: {
  taskId: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
  onEdit: () => void;
}) {
  const task = useAppSelector((state) => state.tasks.taskById[taskId]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'deleteTask' | 'deleteRecurring' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const {
    isOpen: isDropdownOpen,
    toggleDropdown,
    closeDropdown,
  } = useDropdown();

  const groupId = 1771;
  const taskListId = 2874;

  if (!task) return null;

  const openModal = (type: 'deleteTask' | 'deleteRecurring') => {
    setModalState({ isOpen: true, type });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
    setIsModalOpen(false);
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
              closeDropdown();
              openModal('deleteTask');
            }}
          >
            단일 삭제하기
          </DropdownItem>
          <DropdownItem
            className="text-sm"
            onClick={() => {
              closeDropdown();
              openModal('deleteRecurring');
            }}
          >
            반복 삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>

      {modalState.isOpen && modalState.type === 'deleteTask' && (
        <DeleteTaskModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onDeleteSuccess={() => {
            onDeleteSuccess();
          }}
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
        />
      )}

      {modalState.isOpen && modalState.type === 'deleteRecurring' && (
        <DeleteRecurringModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onDeleteSuccess={onDeleteSuccess}
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
        />
      )}
    </>
  );
}
