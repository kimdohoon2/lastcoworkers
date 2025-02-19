'use client';

import { useRef, useEffect } from 'react';
import HeaderBoardButton from '@/app/components/common/header/Boards';
import IconClose from '@/app/components/icons/IconClose';
import HeaderTeam from '@/app/components/common/header/HeaderTeam';

interface SlidemenuBarType {
  visible: boolean;
  onClose: () => void;
}

export default function SideMenuBar({ visible, onClose }: SlidemenuBarType) {
  const divRef = useRef<HTMLDivElement | null>(null);

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
          <div className="flex flex-col gap-6">
            <HeaderTeam type="sidebar" onClick={onClose} />
            <HeaderBoardButton
              className="block text-md tablet:hidden"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
