'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '@/app/components/common/input/Input';
import Button from '@/app/components/common/button/Button';
import { FormData } from '@/app/types/AuthType';
import useSignUp from '@/app/hooks/useSignUp';

export default function SignUpComponent() {
  const methods = useForm<FormData>({
    mode: 'onChange',
  });
  const signUpMutation = useSignUp();

  const onSubmit = (data: FormData) => {
    signUpMutation.mutate(data);
  };

  return (
    <div className="mt-16 px-4 tablet:mx-auto tablet:w-[28.75rem] tablet:px-0">
      <h3 className="pb-6 pt-6 text-center text-2xl tablet:pb-20 tablet:pt-[6.25rem] xl:text-4xl">
        회원가입
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="mb-10 flex flex-col gap-6">
            <Input
              name="nickname"
              title="이름"
              type="text"
              placeholder="이름을 입력해주세요."
              autoComplete="name"
              validationRules={{
                required: '이름을 입력해주세요.',
                maxLength: {
                  value: 20,
                  message: '닉네임은 최대 20자까지 가능합니다.',
                },
              }}
            />
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
            <Input
              name="passwordConfirmation"
              title="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
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
            className="w-full text-white"
            disabled={!methods.formState.isValid}
          >
            회원가입
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
