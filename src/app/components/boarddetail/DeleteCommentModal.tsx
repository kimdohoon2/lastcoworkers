'use client';

import ConfirmModal from '@/app/components/common/modal/ConfirmModal';

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteCommentModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteCommentModalProps) {
  return (
    <ConfirmModal
      title={
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-lg font-light">댓글을 삭제하시겠어요?</h2>
          <p className="mb-4 text-center text-md font-thin">
            삭제된 댓글은 복구할 수 없습니다.
          </p>
        </div>
      }
      cancelLabel="닫기"
      confirmLabel="삭제하기"
      isModalOpen={isOpen}
      handleCancel={onClose}
      handleConfirm={onConfirm}
    />
  );
}
