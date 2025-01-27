import useDropdown from '@/app/hooks/useDropdown';
import { useState } from 'react';
import Dropdown from '../common/dropdown/Dropdown';
import DropdownItem from '../common/dropdown/DropdownItem';
import DropdownList from '../common/dropdown/DropdownList';
import DropdownToggle from '../common/dropdown/DropdownToggle';
import TaskCardDropdown from '../icons/TaskCardDropdown';
import DeleteTaskModal from './DeleteTaskModal';
import DeleteRecurringModal from './DeleteRecurringModal';

export default function TaskCardMenu({
  groupId,
  taskListId,
  taskId,
  taskName,
  recurringId,
}: {
  groupId: number;
  taskListId: number;
  taskId: number;
  taskName: string;
  recurringId: number;
}) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'deleteTask' | 'deleteRecurring' | 'editTask' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const {
    isOpen: isDropdownOpen,
    toggleDropdown,
    closeDropdown,
  } = useDropdown();

  const openModal = (type: 'editTask' | 'deleteTask' | 'deleteRecurring') => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
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
            className="text-md"
            onClick={() => {
              closeDropdown();
            }}
            onClose={closeDropdown}
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            className="text-md"
            onClick={() => {
              closeDropdown();
              openModal('deleteRecurring');
            }}
          >
            반복 제거하기
          </DropdownItem>
          <DropdownItem
            className="text-md"
            onClick={() => {
              closeDropdown();
              openModal('deleteTask');
            }}
          >
            할 일 삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>
      {modalState.isOpen && modalState.type === 'deleteRecurring' && (
        <DeleteRecurringModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
          recurringId={recurringId}
          taskName={taskName}
        />
      )}

      {modalState.isOpen && modalState.type === 'deleteTask' && (
        <DeleteTaskModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
          taskName={taskName}
        />
      )}
    </>
  );
}
