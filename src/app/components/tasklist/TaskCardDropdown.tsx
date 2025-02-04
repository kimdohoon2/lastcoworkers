import useDropdown from '@/app/hooks/useDropdown';
import { useState } from 'react';
import { useAppSelector } from '@/app/stores/hooks';
import Dropdown from '../common/dropdown/Dropdown';
import DropdownItem from '../common/dropdown/DropdownItem';
import DropdownList from '../common/dropdown/DropdownList';
import DropdownToggle from '../common/dropdown/DropdownToggle';
import IconTaskCardDropdown from '../icons/TaskCardDropdown';
import DeleteTaskModal from './DeleteTaskModal';
import DeleteRecurringModal from './DeleteRecurringModal';
import EditTaskModal from './EditTaskModal';

interface TaskCardDropdownInterface {
  groupId: number;
  taskListId: number;
  taskId: number;
}

export default function TaskCardDropdown({
  groupId,
  taskListId,
  taskId,
}: TaskCardDropdownInterface) {
  const task = useAppSelector((state) => state.tasks.taskById[taskId]);
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

  if (!task) return null;

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
          <IconTaskCardDropdown />
        </DropdownToggle>
        <DropdownList
          isOpen={isDropdownOpen}
          className="absolute right-0 w-[5.875rem] overflow-hidden border sm:w-[7.5rem]"
        >
          <DropdownItem
            className="text-sm"
            onClick={() => {
              closeDropdown();
              openModal('editTask');
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

      {modalState.isOpen && modalState.type === 'editTask' && (
        <EditTaskModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
        />
      )}

      {modalState.isOpen && modalState.type === 'deleteTask' && (
        <DeleteTaskModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
        />
      )}

      {modalState.isOpen && modalState.type === 'deleteRecurring' && (
        <DeleteRecurringModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          groupId={groupId}
          taskListId={taskListId}
          taskId={taskId}
        />
      )}
    </>
  );
}
