import useDropdown from '@/app/hooks/useDropdown';
import { useAppSelector } from '@/app/stores/hooks';
import useModal from '@/app/hooks/useModal';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconTaskCardDropdown from '@/app/components/icons/TaskCardDropdown';
import DeleteTaskModal from '@/app/components/tasklist/DeleteTaskModal';
import DeleteRecurringModal from '@/app/components/tasklist/DeleteRecurringModal';
import EditTaskModal from '@/app/components/tasklist/EditTaskModal';

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
          className="absolute right-0 w-[7rem] overflow-hidden border"
        >
          <DropdownItem
            onClick={() => {
              editTaskModal.openModal();
              closeDropdown();
            }}
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              deleteTaskModal.openModal();
              closeDropdown();
            }}
          >
            단일 삭제하기
          </DropdownItem>
          <DropdownItem
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
