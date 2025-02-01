'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import getUser, { GetUserResponse } from '@/app/lib/user/getUser';
import { SignInResponse, FormData } from '@/app/types/AuthType';
import postSignInApi from '@/app/lib/auth/postSignInApi';
import Input from '../common/input/Input';
import Button from '../common/button/Button';
import ResetPasswordModal from './ResetPasswordModal';

export default function ResetPassword() {
  const methods = useForm<FormData>();
  const { handleSubmit, setError } = methods;

  const handlePasswordChange = (newPassword: string) => {
    console.log('새 비밀번호:', newPassword);
    // 비밀번호 변경 API 호출 로직 추가
  };

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 유저 데이터 가져오기
  const { data: userData, isLoading } = useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: true,
  });

  // 비밀번호 검증 API 요청
  const mutation = useMutation<
    SignInResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: (data) => postSignInApi(data),
    onSuccess: (response) => {
      if (response?.accessToken) {
        setIsModalOpen(true);
      } else {
        setError('password', { message: '비밀번호가 일치하지 않습니다.' });
      }
    },
    onError: () => {
      setError('password', { message: '비밀번호가 일치하지 않습니다.' });
    },
  });

  // 비밀번호 확인 핸들러
  const onSubmit = async (data: FormData) => {
    if (!userData?.email) {
      setError('password', { message: '유저 정보를 불러올 수 없습니다.' });
      return;
    }

    mutation.mutate({ email: userData.email, password: data.password });
  };

  if (isLoading)
    return <div className="text-center text-gray-500">로딩 중...</div>;

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            backgroundColor="bg-background-tertiary"
            customButton={
              <Button variant="plus" size="small">
                변경하기
              </Button>
            }
          />
        </form>
      </FormProvider>
      {/* 모달 창 */}
      <ResetPasswordModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  );
}
