import clsx from 'clsx';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconToggle from '@/app/components/icons/IconToggle';
import useDropdown from '@/app/hooks/useDropdown';

interface BoardsOrderDropDownProps {
  setSortOrder: (order: string) => void;
}

export default function BoardsOrderDropDown({
  setSortOrder,
}: BoardsOrderDropDownProps) {
  const { isOpen, toggleDropdown, closeDropdown, currentItem, selectItem } =
    useDropdown();

  const handleItemClick = (item: string) => {
    selectItem(item);
    setSortOrder(item === '최신순' ? 'recent' : 'like');
  };
  return (
    <div className="w-28 tablet:w-36">
      <Dropdown className="w-full" onClose={closeDropdown}>
        <DropdownToggle className="w-full" onClick={toggleDropdown}>
          <div className="flex w-full items-center justify-between rounded-xl bg-background-secondary px-2 py-[13.5px] text-xs text-text-primary hover:bg-background-tertiary tablet:px-4 tablet:text-md">
            {currentItem || '최신순'}
            <IconToggle
              className={clsx('transition-transform', {
                'rotate-180': isOpen,
                'rotate-0': !isOpen,
              })}
            />
          </div>
        </DropdownToggle>

        <DropdownList className="mt-[6px] w-full" isOpen={isOpen}>
          <DropdownItem
            className="pl-2 text-start text-xs tablet:pl-4 tablet:text-md"
            onClick={() => handleItemClick('최신순')}
            onClose={closeDropdown}
          >
            최신순
          </DropdownItem>
          <DropdownItem
            className="pl-2 text-start text-xs tablet:pl-4 tablet:text-md"
            onClick={() => handleItemClick('좋아요 많은순')}
            onClose={closeDropdown}
          >
            좋아요 많은순
          </DropdownItem>
        </DropdownList>
      </Dropdown>
    </div>
  );
}
