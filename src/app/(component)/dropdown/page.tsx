'use client';

import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconToggle from '@/app/components/icons/IconToggle';
import useDropdown from '@/app/hooks/useDropdown';
import clsx from 'clsx';
import React from 'react';

export default function DropdownExample() {
  const { isOpen, toggleDropdown, closeDropdown, currentItem, selectItem } =
    useDropdown();

  const handleItemClick = (item: string) => {
    selectItem(item);
  };

  return (
    <Dropdown className="ml-4 mt-4" onClose={closeDropdown}>
      <DropdownToggle onClick={toggleDropdown}>
        <div className="mb-2 flex w-28 items-center justify-between rounded-xl bg-background-secondary px-3.5 py-2.5 text-center text-sm font-normal text-text-primary hover:bg-background-tertiary">
          {currentItem || '메뉴 추천'}
          <IconToggle
            className={clsx('transition-transform', {
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            })}
          />
        </div>
      </DropdownToggle>

      <DropdownList className="w-28" isOpen={isOpen}>
        <DropdownItem
          className="text-start"
          onClick={() => handleItemClick('돈까스')}
          onClose={closeDropdown}
        >
          돈까스
        </DropdownItem>
        <DropdownItem
          className="text-start"
          onClick={() => handleItemClick('떡볶이')}
          onClose={closeDropdown}
        >
          떡볶이
        </DropdownItem>
        <DropdownItem
          className="text-start"
          onClick={() => handleItemClick('마라탕')}
          onClose={closeDropdown}
        >
          마라탕
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
