'use client';

import ConfirmModal from '@/app/components/common/modal/ConfirmModal';

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isConfirmDisabled?: boolean;
}

export default function DeleteCommentModal({
  isOpen,
  onClose,
  onDelete,
  isConfirmDisabled = false,
}: DeleteCommentModalProps) {
  return (
    <ConfirmModal
      isModalOpen={isOpen}
      title={
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-lg font-light">댓글을 삭제하시겠어요?</h2>
          <p className="text-md font-thin">삭제 후에는 되돌릴 수 없습니다.</p>
        </div>
      }
      cancelLabel="닫기"
      confirmLabel="삭제하기"
      handleCancel={onClose}
      handleConfirm={onDelete}
      isConfirmDisabled={isConfirmDisabled}
    />
  );
}
