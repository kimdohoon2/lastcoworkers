'use client';

import React from 'react';
import Button from '@/app/components/common/button/Button';
import IconCheck from '@/app/components/icons/IconCheck';
import IconPlus from '@/app/components/icons/IconPlus';

function TestPage() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    /** 이벤트 리스너 */
    console.log('Button clicked:', e);
  };

  return (
    <div className="flex flex-col gap-20 p-8">
      <div className="flex items-start gap-5">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <Button variant="primary" size="large" onClick={handleClick}>
              생성하기
            </Button>
            <Button variant="primary" size="large" disabled>
              생성하기
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="inverse" size="large" onClick={handleClick}>
              생성하기
            </Button>
            <Button variant="inverse" size="large" disabled>
              생성하기
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="secondary" size="large" onClick={handleClick}>
              생성하기
            </Button>
            <Button variant="danger" size="large" onClick={handleClick}>
              생성하기
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <Button variant="primary" size="small" onClick={handleClick}>
              생성하기
            </Button>
            <Button variant="primary" size="small" disabled>
              생성하기
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="inverse" size="small" onClick={handleClick}>
              생성하기
            </Button>
            <Button variant="inverse" size="small" disabled>
              생성하기
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <Button variant="plus" size="plus" onClick={handleClick}>
            <IconPlus />할 일 추가
          </Button>
          <Button variant="plus" size="plus" disabled>
            <IconPlus />할 일 추가
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="complete" size="complete" onClick={handleClick}>
            <IconCheck />
            완료하기
          </Button>
          <Button variant="complete" size="complete" disabled>
            <IconCheck />
            완료하기
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="cancel" size="cancel" onClick={handleClick}>
            <IconCheck />
            완료 취소하기
          </Button>
          <Button variant="cancel" size="cancel" disabled>
            <IconCheck />
            완료 취소하기
          </Button>
        </div>
      </div>
      <Button className="w-[460px] text-sm">커스터마이즈 버튼</Button>
    </div>
  );
}

export default TestPage;
