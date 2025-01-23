import useDropdown from '@/app/hooks/useDropdown';
import Dropdown from '../common/dropdown/Dropdown';
import DropdownItem from '../common/dropdown/DropdownItem';
import DropdownList from '../common/dropdown/DropdownList';
import DropdownToggle from '../common/dropdown/DropdownToggle';
import TaskCardDropdown from '../icons/TaskCardDropdown';

export default function TaskCardMenu() {
  const { isOpen, toggleDropdown, closeDropdown, selectItem } = useDropdown();

  const handleItemClick = (item: string) => {
    selectItem(item);
  };

  return (
    <>
      <Dropdown onClose={closeDropdown} className="relative">
        <DropdownToggle onClick={toggleDropdown}>
          <TaskCardDropdown />
        </DropdownToggle>
        <DropdownList
          isOpen={isOpen}
          className="absolute right-0 w-[94px] overflow-hidden border-2 sm:w-[120px]"
        >
          <DropdownItem
            className="text-xs"
            onClick={() => handleItemClick('수정하기')}
            onClose={closeDropdown}
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            className="text-xs"
            onClick={() => handleItemClick('삭제하기')}
            onClose={closeDropdown}
          >
            삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </>
  );
}
