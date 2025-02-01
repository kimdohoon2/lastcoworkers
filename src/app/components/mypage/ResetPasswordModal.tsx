'use client';

import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../common/modal/Modal';
import Input from '../common/input/Input';
import Button from '../common/button/Button';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (newPassword: string) => void;
}

export default function ResetPasswordModal({
  isOpen,
  closeModal,
  onSubmit,
}: ResetPasswordModalProps) {
  const methods = useForm<FormData>();
  const { handleSubmit, setError, watch } = methods;

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  // 비밀번호 변경 핸들러
  const handleChangePassword = (data: FormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', { message: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    onSubmit(data.newPassword);
    closeModal();
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
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
                  message:
                    '비밀번호는 8~20자의 숫자, 영문, 특수문자가 포함되어야 합니다.',
                },
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

            <div className="mt-6 flex justify-between gap-2">
              <Button
                type="button"
                onClick={closeModal}
                variant="inverse"
                size="large"
              >
                닫기
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
