'use client';

import { useState } from 'react';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import IconMore from '../icons/IconMore';

interface CommentDropdownProps {
  commentId: number;
  onEdit: (commentId: number) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentDropdown({
  commentId,
  onEdit,
  onDelete,
}: CommentDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown className="relative" onClose={() => setIsOpen(false)}>
      <DropdownToggle
        className="p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IconMore />
      </DropdownToggle>

      <DropdownList
        isOpen={isOpen}
        className="right-0 mt-2 w-[120px] shadow-md"
      >
        <DropdownItem
          onClick={() => {
            onEdit(commentId);
            setIsOpen(false);
          }}
        >
          수정하기
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            onDelete(commentId);
            setIsOpen(false);
          }}
        >
          삭제하기
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
