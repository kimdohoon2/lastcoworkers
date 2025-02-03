import clsx from 'clsx';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconGear from '@/app/components/icons/IconGear';
import useDropdown from '@/app/hooks/useDropdown';

export default function HeaderDropdown() {
  const { isOpen, toggleDropdown, closeDropdown, selectItem } = useDropdown();

  const handleEditClick = (item: string) => {
    selectItem(item);
  };

  const handleDeleteClick = (item: string) => {
    selectItem(item);
  };
  return (
    <Dropdown className="relative flex items-center" onClose={closeDropdown}>
      <DropdownToggle onClick={toggleDropdown}>
        <IconGear
          className={clsx('transition-transform', {
            'rotate-180': isOpen,
            'rotate-0': !isOpen,
          })}
        />
      </DropdownToggle>
      <DropdownList className="absolute right-4 top-6 w-28" isOpen={isOpen}>
        <DropdownItem
          className="text-center"
          onClick={() => handleEditClick('수정하기')}
          onClose={closeDropdown}
        >
          수정하기
        </DropdownItem>
        <DropdownItem
          className="text-center"
          onClick={() => handleDeleteClick('삭제하기')}
          onClose={closeDropdown}
        >
          삭제하기
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
