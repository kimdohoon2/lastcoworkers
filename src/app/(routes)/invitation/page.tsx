'use client';

import Button from '@/app/components/common/button/Button';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const params = useSearchParams();
  const [token, setToken] = useState('');

  const handleClick = () => {};

  useEffect(() => {
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [params]);

  return (
    <div>
      <div className="mx-auto mt-[3.75rem] max-w-[23.4375rem] px-4 pt-[4.5rem] tablet:w-[28.75rem] tablet:px-0 tablet:pt-[6.25rem]">
        <h2 className="mb-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
          팀 참여하기
        </h2>
        <div className="mb-3 text-lg font-medium">팀 링크</div>
        <input
          className="w-full rounded-xl border border-border-primary bg-background-secondary px-4 py-[0.85rem] disabled:cursor-not-allowed disabled:text-text-default"
          value={token}
          disabled
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
