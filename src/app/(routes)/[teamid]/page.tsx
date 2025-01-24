'use client';

import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconGear from '@/app/components/icons/IconGear';
import TeamThumbnail from '@/app/components/icons/TeamThumbnail';
import useDropdown from '@/app/hooks/useDropdown';
import clsx from 'clsx';

export default function TeamPage() {
  const { isOpen, toggleDropdown, closeDropdown, selectItem } = useDropdown();

  const handleItemClick = (item: string) => {
    selectItem(item);
  };

  return (
    <div className="box-border h-full w-full px-4">
      <div className="border-state-50/10 bg-state-50 relative mx-auto mt-[5.25rem] flex h-16 w-full max-w-[75rem] items-center justify-between rounded-xl border px-6">
        <span className="z-10 text-xl font-bold">
          경영관리팀테스트테스트테스트
        </span>
        <div className="absolute right-[5.625rem] z-0">
          <TeamThumbnail />
        </div>
        <Dropdown
          className="relative flex items-center"
          onClose={closeDropdown}
        >
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
              onClick={() => handleItemClick('돈까스')}
              onClose={closeDropdown}
            >
              수정하기
            </DropdownItem>
            <DropdownItem
              className="text-center"
              onClick={() => handleItemClick('떡볶이')}
              onClose={closeDropdown}
            >
              삭제하기
            </DropdownItem>
          </DropdownList>
        </Dropdown>
      </div>
    </div>
  );
}
