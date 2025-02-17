'use client';

import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import useModal from '@/app/hooks/useModal';
import IconMore from '@/app/components/icons/IconMore';
import DeleteCommentModal from '@/app/components/boarddetail/DeleteCommentModal';

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
  const {
    isOpen: isDropdownOpen,
    openModal: openDropdown,
    closeModal: closeDropdown,
  } = useModal();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal(); // useModal 훅 사용

  return (
    <>
      <Dropdown className="relative" onClose={closeDropdown}>
        <DropdownToggle className="p-2" onClick={openDropdown}>
          <IconMore />
        </DropdownToggle>

        <DropdownList
          isOpen={isDropdownOpen}
          className="right-0 mt-2 w-[120px] shadow-md"
        >
          <DropdownItem
            onClick={() => {
              onEdit(commentId);
              closeDropdown();
            }}
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              openModal();
              closeDropdown();
            }}
          >
            삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <DeleteCommentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={() => {
            onDelete(commentId);
            closeModal();
          }}
        />
      )}
    </>
  );
}
