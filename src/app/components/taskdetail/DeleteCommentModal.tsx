'use client';

import Modal from '../common/modal/Modal';
import Button from '../common/button/Button';
import IconAlert from '../icons/IconAlert';

export default function DeleteCommentModal({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="flex flex-col items-center">
        <IconAlert />
        <div className="mt-4 flex w-[239px] flex-col items-center">
          <h2 className="mb-4 text-lg font-light">댓글을 삭제하시겠어요?</h2>
          <p className="mb-6 text-center text-md font-thin">
            삭제 후에는 되돌릴 수 없습니다.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={onClose} variant="secondary" className="w-[8.5rem]">
            닫기
          </Button>
          <Button onClick={onDelete} variant="danger" className="w-[8.5rem]">
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
