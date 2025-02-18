'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import patchUser, { PatchUserRequest } from '@/app/lib/user/patchUser';
import Modal from '@/app/components/common/modal/Modal';
import useModal from '@/app/hooks/useModal';
import Button from '@/app/components/common/button/Button';
import useToast from '@/app/hooks/useToast';

interface NicknameChangerProps {
  currentNickname: string;
  refetchUser: () => void;
}

export default function NicknameChanger({
  currentNickname,
  refetchUser,
}: NicknameChangerProps) {
  const methods = useForm({ defaultValues: { nickname: currentNickname } });
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const { isOpen, openModal, closeModal } = useModal();
  const newNickname = watch('nickname');
  const { showToast } = useToast();

  // 닉네임 변경 API 호출
  const updateNicknameMutation = useMutation({
    mutationFn: (updatedData: PatchUserRequest) => patchUser(updatedData),
    onSuccess: () => {
      refetchUser();
      closeModal();
    },
    onError: () => {
      showToast({
        message: '이미 사용 중인 닉네임입니다. 다른 닉네임을 사용해주세요.😃',
        type: 'warning',
      });
    },
  });

  const handleNicknameChange = () => {
    if (!newNickname.trim()) {
      showToast({ message: '닉네임을 입력해주세요.😃', type: 'warning' });
      return;
    }
    openModal();
  };

  const confirmNicknameChange = () => {
    updateNicknameMutation.mutate({ nickname: newNickname });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleNicknameChange)}>
        <h2 className="mb-3 text-lg font-light">닉네임</h2>

        <div className="relative flex w-full items-center">
          <input
            className="w-full rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-3 pl-4 focus:border-interaction-focus focus:outline-none"
            {...register('nickname', {
              required: '닉네임을 입력하세요.',
              maxLength: {
                value: 30,
                message: '닉네임은 최대 30자까지 입력할 수 있습니다.',
              },
            })}
            type="text"
            placeholder="새 닉네임 입력"
            autoComplete="off"
          />
          <div className="absolute right-4 flex gap-2">
            <Button variant="primary" size="small" type="submit">
              변경하기
            </Button>
          </div>
        </div>

        {/* 닉네임 길이 제한 오류 메시지 */}
        {errors.nickname && (
          <p className="ml-2 mt-3 text-sm text-point-red">
            {errors.nickname.message}
          </p>
        )}
      </form>

      <Modal isOpen={isOpen} closeModal={closeModal} hasCloseBtn>
        <div className="flex w-full flex-col items-center px-9 tablet:px-10">
          <h2 className="mb-5 text-lg font-bold">닉네임 변경 확인</h2>
          <p className="mb-5 text-center">
            닉네임을 &ldquo;{newNickname}&ldquo;(으)로 변경하시겠습니까?
          </p>
          <div className="flex w-full justify-between gap-2">
            <Button
              type="button"
              onClick={closeModal}
              variant="inverse"
              size="large"
            >
              취소
            </Button>
            <Button
              onClick={confirmNicknameChange}
              variant="primary"
              size="large"
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
}
