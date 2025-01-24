'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import deleteUser, { DeleteUserResponse } from '@/app/lib/user/deleteUser';
import Modal from '../common/modal/Modal';
import IconSubtract from '../icons/IconSubtract';
import Button from '../common/button/Button';
import IconAlert from '../icons/IconAlert';

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation<DeleteUserResponse, Error>({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다.');
      setIsModalOpen(false);
      window.location.href = '/';
    },
    onError: () => {
      alert('이미 탈퇴된 회원입니다.');
    },
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    mutation.mutate();
    handleCloseModal();
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="flex cursor-pointer items-center gap-[0.813rem] border-0 bg-transparent p-0 text-left"
      >
        <IconSubtract />
        <span className="text-lg font-light text-point-red">회원 탈퇴하기</span>
      </button>

      <Modal isOpen={isModalOpen} closeModal={handleCloseModal} hasCloseBtn>
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
              onClick={handleCloseModal}
              variant="secondary"
              className="w-[8.5rem]"
            >
              닫기
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
