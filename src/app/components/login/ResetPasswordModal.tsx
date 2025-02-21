'use client';

import React from 'react';
import Input from '@/app/components/common/input/Input';
import Button from '@/app/components/common/button/Button';
import Modal from '@/app/components/common/modal/Modal';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import useResetPassword from '@/app/hooks/useResetPassword';

interface ResetPasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface FormValues {
  email: string;
}

export default function ResetPasswordModal({
  isOpen,
  closeModal,
}: ResetPasswordModalProps) {
  const resetPasswordMutation = useResetPassword();
  const methods = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const redirectUrl = 'https://team8-coworkers.vercel.app/'; // 배포한 url 나중에 변경할 예정

    resetPasswordMutation.mutate(
      {
        email: data.email,
        redirectUrl,
      },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="max-w-[17.5rem]">
            <p className="text-center">비밀번호 재설정</p>
            <p className="text-center text-md text-text-secondary">
              비밀번호 재설정 링크를 보내드립니다.
            </p>
            <Input
              name="email"
              title=""
              type="email"
              placeholder="이메일을 입력하세요."
              autoComplete="email"
              validationRules={{
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '유효한 이메일 주소를 입력해주세요.',
                },
              }}
            />
            <div className="mt-4 flex gap-2">
              <Button type="button" variant="inverse" onClick={handleClose}>
                닫기
              </Button>
              <Button type="submit" className="text-white">
                링크 보내기
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
