'use client';

import Button from '@/app/components/common/button/Button';
import postAcceptInvitation from '@/app/lib/group/postAcceptInvitation';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const [token, setToken] = useState('');
  const [groupId, setGroupId] = useState('');

  const [testEmail, setTestEmail] = useState('');

  const handleClick = async () => {
    try {
      await postAcceptInvitation({
        /**
         * 임시로 테스트 계정 추가
         * 로그인 구현 후 수정
         */
        userEmail: 'user03@test.com',
        token,
      });
    } catch (error) {
      alert('이미 그룹에 소속된 유저입니다.');
    }
    router.push(groupId);
  };

  useEffect(() => {
    const tokenParam = params.get('token');
    const groupIdParam = params.get('groupId');

    if (tokenParam) {
      setToken(tokenParam);
    }

    if (groupIdParam) {
      setGroupId(groupIdParam);
    }
  }, [params]);

  return (
    <div>
      <div className="mx-auto mt-[3.75rem] max-w-[23.4375rem] px-4 pt-[4.5rem] tablet:w-[28.75rem] tablet:px-0 tablet:pt-[6.25rem]">
        <h2 className="mb-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
          팀 참여하기
        </h2>
        {/* 이메일 입력 input - 로그인 구현 전 임시 테스트를 위한 input */}
        <input
          className="mb-4 w-full rounded-xl border border-border-primary bg-background-secondary px-4 py-[0.85rem] disabled:cursor-not-allowed disabled:text-text-default"
          type="text"
          placeholder="로그인 기능 구현 전 테스트를 위한 임시 input"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
        />
        <div className="mb-3 text-lg font-medium">팀 링크</div>
        <input
          type="text"
          className="w-full rounded-xl border border-border-primary bg-background-secondary px-4 py-[0.85rem] disabled:cursor-not-allowed disabled:text-text-default"
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
