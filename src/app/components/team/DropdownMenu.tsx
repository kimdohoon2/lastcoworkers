import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import TaskCardDropdown from '../icons/TaskCardDropdown';
import IconGear from '@/app/components/icons/IconGear';
import useDropdown from '@/app/hooks/useDropdown';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';

interface DropdownMenuProps {
  iconType?: 'gear' | 'task';
}

export default function DropdownMenu({ iconType = 'gear' }: DropdownMenuProps) {
  const router = useRouter();
  const { teamid } = useParams();
  const { isOpen, toggleDropdown, closeDropdown, selectItem } = useDropdown();

  const handleItemClick = (item: string) => {
    selectItem(item);
  };

  return (
    <Dropdown className="relative flex items-center" onClose={closeDropdown}>
      <DropdownToggle onClick={toggleDropdown}>
        {iconType === 'gear' ? (
          <IconGear
            className={clsx('transition-transform', {
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            })}
          />
        ) : (
          <TaskCardDropdown />
        )}
      </DropdownToggle>
      <DropdownList className="absolute right-4 top-6 w-28" isOpen={isOpen}>
        <DropdownItem
          className="text-center"
          onClick={() => router.push(`${teamid}/edit`)}
          onClose={closeDropdown}
        >
          수정하기
        </DropdownItem>
        <DropdownItem
          className="text-center"
          onClick={() => handleItemClick('삭제하기')}
          onClose={closeDropdown}
        >
          삭제하기
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
