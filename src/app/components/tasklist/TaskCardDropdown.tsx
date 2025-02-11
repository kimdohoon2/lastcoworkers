import useDropdown from '@/app/hooks/useDropdown';
import { useAppSelector } from '@/app/stores/hooks';
import useModal from '@/app/hooks/useModal';
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

  const editTaskModal = useModal();
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
          <IconTaskCardDropdown />
        </DropdownToggle>
        <DropdownList
          isOpen={isDropdownOpen}
          className="absolute right-0 w-[5.875rem] overflow-hidden border sm:w-[7.5rem]"
        >
          <DropdownItem
            className="text-sm"
            onClick={() => {
              editTaskModal.openModal();
              closeDropdown();
            }}
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            className="text-sm"
            onClick={() => {
              deleteTaskModal.openModal();
              closeDropdown();
            }}
          >
            단일 삭제하기
          </DropdownItem>
          <DropdownItem
            className="text-sm"
            onClick={() => {
              deleteRecurringModal.openModal();
              closeDropdown();
            }}
          >
            반복 삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>

      <EditTaskModal
        isOpen={editTaskModal.isOpen}
        onClose={editTaskModal.closeModal}
        groupId={groupId}
        taskListId={taskListId}
        taskId={taskId}
      />

      <DeleteTaskModal
        isOpen={deleteTaskModal.isOpen}
        onClose={deleteTaskModal.closeModal}
        groupId={groupId}
        taskListId={taskListId}
        taskId={taskId}
      />

      <DeleteRecurringModal
        isOpen={deleteRecurringModal.isOpen}
        onClose={deleteRecurringModal.closeModal}
        groupId={groupId}
        taskListId={taskListId}
        taskId={taskId}
      />
    </>
  );
}
