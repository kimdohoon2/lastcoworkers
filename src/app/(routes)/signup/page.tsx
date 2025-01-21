'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import AuthInput from '@/app/components/common/input/auth/AuthInput';

export default function SignUp() {
  const methods = useForm<FormData>();

  interface FormData {
    email: string;
    password: string;
  }

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h3>회원가입</h3>

        {/* 이메일 입력 */}
        <AuthInput
          name="email"
          title="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          validationRules={{
            required: '이메일은 필수 입력 항목입니다.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '유효한 이메일 형식이 아닙니다.',
            },
          }}
        />

        {/* 비밀번호 입력 */}
        <AuthInput
          name="password"
          title="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          validationRules={{
            required: '비밀번호는 필수 입력 항목입니다.',
            minLength: {
              value: 6,
              message: '비밀번호는 최소 6자 이상이어야 합니다.',
            },
          }}
        />

        <button
          type="submit"
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          회원가입
        </button>
      </form>
    </FormProvider>
  );
}
