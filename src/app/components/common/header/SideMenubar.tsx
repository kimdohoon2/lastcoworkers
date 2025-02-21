'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderBoardButton from '@/app/components/common/header/Boards';
import IconClose from '@/app/components/icons/IconClose';
import HeaderTeam from '@/app/components/common/header/HeaderTeam';
import IconPlus from '@/app/components/icons/IconPlus';

interface SlidemenuBarType {
  visible: boolean;
  onClose: () => void;
}

export default function SideMenuBar({ visible, onClose }: SlidemenuBarType) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, [visible]);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={divRef}
      role="menubar"
      tabIndex={0}
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}
      className={`fixed left-0 top-0 z-50 h-screen w-full transition-opacity duration-300 ease-in-out tablet:hidden ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      aria-label="Close Menu"
    >
      <div
        role="menubar"
        tabIndex={0}
        className="h-screen w-1/2 overflow-y-auto bg-background-secondary transition-all duration-300 ease-in-out"
        onClick={stopPropagation}
        aria-label="Close Menu"
        onKeyDown={handleKeyDown}
      >
        <div className="mx-4 flex flex-col overflow-hidden pt-5">
          <button
            className="mb-9 flex self-end"
            onClick={onClose}
            aria-label="Close Menu"
          >
            <IconClose />
          </button>
          <div className="mb-16 flex flex-col gap-6">
            <HeaderTeam type="sidebar" onClick={onClose} />
            <HeaderBoardButton
              className="block text-md tablet:hidden"
              onClick={onClose}
            />
            <button
              onClick={() => {
                router.push('/addteam');
                onClose();
              }}
              className="hover:bg-transparent"
            >
              <div className="flex items-center justify-center gap-1 rounded-xl border border-slate-50 py-2">
                <IconPlus />
                <span className="text-md font-medium">팀 추가하기</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
