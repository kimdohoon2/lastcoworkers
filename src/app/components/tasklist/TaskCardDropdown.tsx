import useDropdown from '@/app/hooks/useDropdown';
import { useState } from 'react';
import Dropdown from '../common/dropdown/Dropdown';
import DropdownItem from '../common/dropdown/DropdownItem';
import DropdownList from '../common/dropdown/DropdownList';
import DropdownToggle from '../common/dropdown/DropdownToggle';
import TaskCardDropdown from '../icons/TaskCardDropdown';
import DeleteTaskModal from './DeleteTaskModal';

export default function TaskCardMenu() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const {
    isOpen: isDropdownOpen,
    toggleDropdown,
    closeDropdown,
  } = useDropdown();

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
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
            }}
          >
            반복 제거하기
          </DropdownItem>
          <DropdownItem
            className="text-md"
            onClick={() => {
              closeDropdown();
              openDeleteModal();
            }}
          >
            할 일 삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>
      <DeleteTaskModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
    </>
  );
}
