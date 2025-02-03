import useDropdown from '@/app/hooks/useDropdown';
import { useAppSelector } from '@/app/stores/hooks';
import { Dispatch, SetStateAction } from 'react';
import Dropdown from '../common/dropdown/Dropdown';
import DropdownItem from '../common/dropdown/DropdownItem';
import DropdownList from '../common/dropdown/DropdownList';
import DropdownToggle from '../common/dropdown/DropdownToggle';
import TaskCardDropdown from '../icons/TaskCardDropdown';

export default function TaskCommentMenu({
  taskId,
  onEdit,
  setIsModalOpen,
}: {
  taskId: number;
  onEdit: () => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const task = useAppSelector((state) => state.tasks.taskById[taskId]);

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
            }}
          >
            삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </>
  );
}
