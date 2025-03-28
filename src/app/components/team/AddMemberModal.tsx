'use client';

import Button from '@/app/components/common/button/Button';
import Modal from '@/app/components/common/modal/Modal';
import copyWithExecCommand from '@/app/utils/copyWithExecCommand';

interface ModalProps {
  token: string;
  isOpen: boolean;
  closeModal: () => void;
}

function AddMemberModal({ token, isOpen, closeModal }: ModalProps) {
  const handleClick = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(token);
    } else {
      copyWithExecCommand(token);
    }
    closeModal();
  };

  if (!token) return null;

  return (
    <Modal hasCloseBtn isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full px-12 text-center">
        <div className="mb-2 text-lg font-medium">멤버 초대</div>
        <div className="mb-6 text-md text-slate-400">
          그룹에 참여할 수 있는 토큰을 복사합니다.
        </div>
        <Button className="w-full text-text-inverse" onClick={handleClick}>
          토큰 복사하기
        </Button>
      </div>
    </Modal>
  );
}

export default AddMemberModal;
