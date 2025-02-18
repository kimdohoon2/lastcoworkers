'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import useModal from '@/app/hooks/useModal';
import getUser, { GetUserResponse } from '@/app/lib/user/getUser';
import { SignInResponse, FormData } from '@/app/types/AuthType';
import postSignInApi from '@/app/lib/auth/postSignInApi';
import Input from '@/app/components/common/input/Input';
import Button from '@/app/components/common/button/Button';
import ResetPasswordModal from '@/app/components/mypage/ResetPasswordModal';
import useToast from '@/app/hooks/useToast';

export default function ResetPassword() {
  const methods = useForm<FormData>();
  const { handleSubmit, setError } = methods;
  const { isOpen, openModal, closeModal } = useModal();
  const { showToast } = useToast();

  // 현재 로그인한 OAuth 제공자 확인
  const provider = useSelector((state: RootState) => state.oauth.provider);

  // 유저 데이터 가져오기
  const { data: userData, isLoading } = useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: getUser,
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
        openModal();
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

    // 카카오 로그인 시 비밀번호 변경 불가 처리
    if (provider === 'KAKAO') {
      showToast({
        message: '카카오 로그인 계정은 비밀번호 변경이 불가합니다.🧐',
        type: 'info',
      });
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
            placeholder="현재 비밀번호를 입력해주세요."
            autoComplete="new-password"
            validationRules={{
              required: '현재 비밀번호를 입력해주세요.',
            }}
            backgroundColor="bg-background-secondary"
            customButton={
              <Button variant="plus" size="small">
                변경하기
              </Button>
            }
          />
        </form>
      </FormProvider>

      {/* 모달 창 */}
      <ResetPasswordModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}
