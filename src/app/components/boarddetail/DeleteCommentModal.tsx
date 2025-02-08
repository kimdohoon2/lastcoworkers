'use client';

import Modal from '@/app/components/common/modal/Modal';
import Button from '@/app/components/common/button/Button';
import IconAlert from '@/app/components/icons/IconAlert';

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
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="flex flex-col items-center">
        <IconAlert />
        <div className="mt-4 flex w-[239px] flex-col items-center">
          <h2 className="mb-4 text-lg font-light">댓글을 삭제하시겠어요?</h2>
          <p className="mb-6 text-center text-md font-thin">
            삭제된 댓글은 복구할 수 없습니다.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={onClose} variant="secondary" className="w-[8.5rem]">
            닫기
          </Button>
          <Button onClick={onConfirm} variant="danger" className="w-[8.5rem]">
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
