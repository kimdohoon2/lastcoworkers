'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import patchPassword from '@/app/lib/user/patchPassword';
import Modal from '@/app/components/common/modal/Modal';
import Input from '@/app/components/common/input/Input';
import Button from '@/app/components/common/button/Button';
import useToast from '@/app/hooks/useToast';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ResetPasswordModal({
  isOpen,
  closeModal,
}: ResetPasswordModalProps) {
  const methods = useForm<FormData>();
  const { handleSubmit, setError, watch } = methods;

  const newPassword = watch('newPassword');
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: patchPassword,
    onSuccess: () => {
      showToast({ message: '비밀번호 변경 완료!😊.', type: 'success' });
      closeModal();
    },
    onError: (error: unknown) => {
      setError('newPassword', {
        message:
          error instanceof Error
            ? error.message
            : '비밀번호 변경에 실패했습니다.',
      });
    },
  });

  // 비밀번호 변경 핸들러
  const handleChangePassword = (data: FormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', { message: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    mutation.mutate({
      password: data.newPassword,
      passwordConfirmation: data.confirmPassword,
    });
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full px-9 tablet:px-10">
        <h2 className="mb-4 text-center text-lg">비밀번호 변경하기</h2>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="flex flex-col gap-4"
          >
            <Input
              name="newPassword"
              title="새 비밀번호"
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              autoComplete="new-password"
              validationRules={{
                required: '비밀번호를 입력해주세요.',
              }}
              backgroundColor="bg-background-secondary"
            />

            <Input
              name="confirmPassword"
              title="새 비밀번호 확인"
              type="password"
              placeholder="새 비밀번호를 다시 한 번 입력해주세요."
              autoComplete="new-password"
              validationRules={{
                required: '비밀번호를 한 번 더 입력해주세요.',
                validate: (value) =>
                  value === newPassword || '비밀번호가 일치하지 않습니다.',
              }}
              backgroundColor="bg-background-secondary"
            />

            <div className="mt-2 flex justify-between gap-2">
              <Button
                type="button"
                onClick={closeModal}
                variant="inverse"
                size="large"
              >
                취소
              </Button>
              <Button type="submit" variant="primary" size="large">
                변경하기
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}
