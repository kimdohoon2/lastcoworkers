'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Link from 'next/link';
import Input from '@/app/components/common/input/Input';
import Button from '@/app/components/common/button/Button';
import { FormData } from '@/app/types/AuthType';
import useSignIn from '@/app/hooks/useSignIn';
import useModal from '@/app/hooks/useModal';
import QuickLogin from '@/app/components/login/QuickLogin';
import ResetPasswordModal from '@/app/components/login/ResetPasswordModal';

export default function LoginComponent() {
  const { isOpen, openModal, closeModal } = useModal();

  const methods = useForm<FormData>({
    mode: 'onChange',
  });

  const signInMutation = useSignIn();

  const onSubmit = (data: FormData) => {
    signInMutation.mutate(data);
  };

  return (
    <>
      <div className="mt-16 px-4 tablet:mx-auto tablet:w-[28.75rem] tablet:px-0">
        <h3 className="pb-6 pt-6 text-center text-2xl tablet:pb-20 tablet:pt-[6.25rem] xl:text-4xl">
          로그인
        </h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <Input
                name="email"
                title="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                autoComplete="email"
                validationRules={{
                  required: '유효한 이메일이 아닙니다.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '이메일 형식으로 작성해 주세요.',
                  },
                }}
              />
              <Input
                name="password"
                title="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해주세요."
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
            </div>
            <button
              type="button"
              onClick={openModal}
              className="mb-10 mt-3 flex justify-self-end text-md text-brand-primary underline tablet:text-lg"
            >
              비밀번호를 잊으셨나요?
            </button>
            <Button
              type="submit"
              className="w-full text-white"
              disabled={!methods.formState.isValid}
            >
              로그인
            </Button>
          </form>
        </FormProvider>
        <div className="mt-6 flex justify-center gap-3">
          <p className="text-md text-text-primary tablet:text-lg">
            아직 계정이 없으신가요?
          </p>
          <Link
            className="text-md text-brand-primary underline tablet:text-lg"
            href="/signup"
          >
            가입하기
          </Link>
        </div>
        <QuickLogin />
      </div>
      <ResetPasswordModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
