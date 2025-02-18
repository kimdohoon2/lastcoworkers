'use client';

import AuthCheckLoading from '@/app/components/common/auth/AuthCheckLoading';
import Button from '@/app/components/common/button/Button';
import useAuthRedirect from '@/app/hooks/useAuthRedirect';
import useToast from '@/app/hooks/useToast';
import postAcceptInvitation from '@/app/lib/group/postAcceptInvitation';
import { RootState } from '@/app/stores/store';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Page() {
  const { isLoading } = useAuthRedirect();

  const router = useRouter();
  const [token, setToken] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const { showToast } = useToast();

  const handleClick = async () => {
    try {
      const { groupId } = await postAcceptInvitation({
        userEmail: user?.email || '',
        token,
      });

      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      router.push(groupId.toString());
    } catch (error) {
      showToast({ message: '이미 그룹에 소속된 유저입니다.🧐', type: 'info' });
    }
  };

  if (isLoading) return <AuthCheckLoading />;

  return (
    <div>
      <div className="mx-auto flex h-screen max-w-[23.4375rem] flex-col justify-center px-4 tablet:w-[28.75rem] tablet:px-0">
        <h2 className="my-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
          팀 참여하기
        </h2>
        <div className="mb-3 text-lg font-medium">팀 링크</div>
        <input
          type="text"
          className="w-full rounded-xl border border-border-primary bg-background-secondary px-4 py-[0.85rem] focus:border-interaction-focus focus:outline-none disabled:cursor-not-allowed disabled:text-text-default"
          placeholder="팀 링크를 입력해주세요."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button
          variant="primary"
          className="mt-10 w-full text-white"
          onClick={handleClick}
        >
          참여하기
        </Button>
        <div className="mt-6 text-center text-md text-text-primary tablet:text-lg">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </div>
      </div>
    </div>
  );
}

export default Page;
