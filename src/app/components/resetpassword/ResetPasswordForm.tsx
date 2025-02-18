'use client';

import { useSearchParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '@/app/components/common/input/Input';
import Button from '@/app/components/common/button/Button';
import useConfirmPassword from '@/app/hooks/useConfirmPassword';
import { ConfirmPasswordType } from '@/app/types/AuthType';
import useToast from '@/app/hooks/useToast';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { mutate } = useConfirmPassword();
  const { showToast } = useToast();
  const methods = useForm<ConfirmPasswordType>({
    mode: 'onChange',
  });

  const onSubmit = (data: ConfirmPasswordType) => {
    if (!token) {
      showToast({ message: '유효하지 않은 토큰입니다.🧐', type: 'info' });
      return;
    }
    mutate({
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      token,
    });
  };

  return (
    <div className="mt-16 px-4 tablet:mx-auto tablet:w-[28.75rem] tablet:px-0">
      <h3 className="pb-6 pt-6 text-center text-2xl tablet:pb-20 tablet:pt-[6.25rem] xl:text-4xl">
        비밀번호 재설정
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-10 flex flex-col gap-6">
            <Input
              name="password"
              title="비밀번호"
              type="password"
              placeholder="비밀번호(영문,숫자포함,12자이내)를 입력해주세요."
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
            />
            <Input
              name="passwordConfirmation"
              title="비밀번호 확인"
              type="password"
              placeholder="새 비밀번호를 다시 한번 입력해주세요."
              autoComplete="new-password"
              validationRules={{
                required: '비밀번호 확인을 입력해주세요.',
                validate: (value) =>
                  value === methods.getValues('password') ||
                  '비밀번호가 일치하지 않습니다.',
              }}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white"
            disabled={!methods.formState.isValid}
          >
            재설정
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
