'use client';

import ProfileChanger from '@/app/components/mypage/ProflieChanger';
import IconSubtract from '@/app/components/icons/IconSubtract';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import getUser, { GetUserResponse } from '@/app/lib/user/getUser';

export default function MyPage() {
  const method = useForm();
  const { register } = method;

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: getUser,
  });

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        사용자 정보를 불러오는 데 실패했습니다.
      </div>
    );
  }

  if (!userData) {
    return <div className="text-center">데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex justify-center pt-[5.25rem]">
      <div className="flex w-[90%] max-w-[75rem] flex-col">
        <h1 className="mb-6 text-2lg font-bold tablet:text-xl">계정 설정</h1>
        <div className="mb-6">
          <ProfileChanger register={register} />
        </div>
        <div className="mb-6 flex flex-col gap-6">
          <div>
            <h2 className="mb-3 text-lg font-light">이름</h2>
            <div className="rounded-2xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-[0.844rem] pl-4">
              <p className="text-md font-light tablet:text-lg">
                {userData.nickname || '이름 없음'}
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-light">이메일</h3>
            <div className="rounded-2xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-tertiary py-[0.844rem] pl-4">
              <p className="text-md font-light text-text-disabled tablet:text-lg">
                {userData.email || '이메일 없음'}
              </p>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-lg font-light">비밀번호</h4>
            <div className="rounded-2xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-tertiary py-[0.844rem] pl-4">
              <p className="text-md font-light text-text-disabled tablet:text-lg">
                비밀번호 인풋
              </p>
            </div>
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-[0.813rem]">
          <IconSubtract />
          <div className="text-lg font-light text-point-red">회원 탈퇴하기</div>
        </div>
      </div>
    </div>
  );
}
