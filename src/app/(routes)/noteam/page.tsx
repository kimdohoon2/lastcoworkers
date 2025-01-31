'use client';

import Button from '@/app/components/common/button/Button';
import Image from 'next/image';

function Page() {
  return (
    <div className="flex flex-col items-center py-[15.375rem] tablet:py-[22.9375rem] xl:py-[17rem]">
      <div className="relative mb-8 h-[6.125rem] w-[19.5rem] tablet:mb-12 tablet:h-[10.25rem] tablet:w-[32.5rem] xl:h-[15.9375rem] xl:w-[50.625rem]">
        <Image
          src="/contents/img_team_empty_desktop.png"
          alt="소속된 팀이 없습니다."
          fill
        />
      </div>
      <div className="mb-12 text-center text-md font-medium text-text-default tablet:mb-20 tablet:text-lg xl:text-lg">
        아직 소속됨 팀이 없습니다.
        <br />
        팀을 생성하거나 팀에 참여해보세요.
      </div>
      <Button className="mb-2 w-[11.625rem] text-md font-semibold">
        팀 생성하기
      </Button>
      <Button
        className="w-[11.625rem] bg-transparent text-md font-semibold text-brand-primary"
        variant="inverse"
      >
        팀 참여하기
      </Button>
    </div>
  );
}

export default Page;
