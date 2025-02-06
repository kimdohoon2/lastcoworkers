'use client';

import { useMutation } from '@tanstack/react-query';
import deleteUser, { DeleteUserResponse } from '@/app/lib/user/deleteUser';
import useModal from '@/app/hooks/useModal';
import Modal from '../common/modal/Modal';
import IconSubtract from '../icons/IconSubtract';
import Button from '../common/button/Button';
import IconAlert from '../icons/IconAlert';

export default function DeleteAccount() {
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  const mutation = useMutation<DeleteUserResponse, Error>({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다.');
      closeModal();
      window.location.href = '/';
    },
    onError: () => {
      alert('이미 탈퇴된 회원입니다.');
    },
  });

  const handleDelete = () => {
    mutation.mutate();
    closeModal();
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="flex cursor-pointer items-center gap-[0.813rem] border-0 bg-transparent p-0 text-left"
      >
        <IconSubtract />
        <span className="text-lg font-light text-point-red">회원 탈퇴하기</span>
      </button>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="flex flex-col items-center">
          <IconAlert />
          <div className="mt-4 flex w-[239px] flex-col items-center">
            <h2 className="mb-4 text-lg font-light">
              회원 탈퇴를 진행하시겠어요?
            </h2>
            <p className="mb-6 text-center text-md font-thin">
              그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서
              나가집니다.
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={closeModal}
              variant="secondary"
              className="w-[8.5rem]"
            >
              취소
            </Button>
            <Button
              onClick={handleDelete}
              variant="danger"
              className="w-[8.5rem]"
            >
              회원 탈퇴
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
