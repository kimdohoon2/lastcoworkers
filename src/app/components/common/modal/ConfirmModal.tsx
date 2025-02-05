'use client';

import Button from '@/app/components/common/button/Button';
import Modal from '@/app/components/common/modal/Modal';
import IconAlert from '@/app/components/icons/IconAlert';

interface ConfirmModalInterface {
  title: string;
  cancelLabel?: string;
  confirmLabel?: string;
  isModalOpen: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
}

function ConfirmModal({
  title,
  cancelLabel,
  confirmLabel,
  isModalOpen,
  handleCancel,
  handleConfirm,
}: ConfirmModalInterface) {
  return (
    <Modal isOpen={isModalOpen} closeModal={handleCancel}>
      <div className="flex flex-col items-center">
        <IconAlert />
        <div className="mt-4 flex w-[239px] flex-col items-center">
          <h2 className="mb-4 text-lg font-light">{title}</h2>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            onClick={handleCancel}
            variant="secondary"
            className="w-[8.5rem]"
          >
            {cancelLabel || '닫기'}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="danger"
            className="w-[8.5rem]"
          >
            {confirmLabel || '회원 탈퇴'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
