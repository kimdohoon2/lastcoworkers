'use client';

import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import getUser, { GetUserResponse } from '@/app/lib/user/getUser';
import DeleteAccount from '@/app/components/mypage/DeleteAccount';
import ResetPassword from '@/app/components/mypage/ResetPassword';
import NicknameChanger from '@/app/components/mypage/NicknameChanger';
import ProfileChanger from '@/app/components/mypage/ProflieChanger';
import useAuthRedirect from '@/app/hooks/useAuthRedirect';

export default function MyPage() {
  const method = useForm();
  const { register } = method;
  const { isLoading: isAuthLoading } = useAuthRedirect();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!accessToken, // 로그인 상태일 때만 실행
  });

  if (isAuthLoading || isLoading) {
    return <div className="text-center">사용자 정보를 불러오는 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        사용자 정보를 불러오는 데 실패했습니다.
      </div>
    );
  }

  if (!userData) {
    return <div className="text-center">존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div className="flex justify-center pt-[5.25rem]">
      <div className="flex w-[90%] max-w-[75rem] flex-col">
        <h1 className="mb-6 text-2lg font-bold tablet:text-xl">계정 설정</h1>
        <div className="mb-6">
          <ProfileChanger register={register} />
        </div>
        <div className="mb-6 flex flex-col gap-6">
          <NicknameChanger
            currentNickname={userData.nickname}
            refetchUser={refetch}
          />
          <div>
            <h3 className="mb-3 text-lg font-light">이메일</h3>
            <div className="rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-tertiary py-[0.844rem] pl-4">
              <p className="text-md font-light text-text-disabled tablet:text-lg">
                {userData.email || '이메일 없음'}
              </p>
            </div>
          </div>
          <div>
            <ResetPassword />
          </div>
        </div>
        <DeleteAccount />
      </div>
    </div>
  );
}
