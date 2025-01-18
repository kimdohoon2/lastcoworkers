'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import IconClose from '@/app/components/icons/IconClose';

interface ModalProps {
  hasCloseBtn?: boolean;
  portalRoot?: HTMLElement;
  closeModal: () => void;
}

function Modal({
  hasCloseBtn = false,
  portalRoot, // Modal 렌더링할 상위 DOM 노드
  closeModal,
  children,
}: PropsWithChildren<ModalProps>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center max-[744px]:justify-end">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal}
      />
      <div
        className={`bg-background-secondary relative flex w-96 flex-col items-center rounded-xl pb-8 pt-12 max-[744px]:w-full max-[744px]:rounded-b-none`}
      >
        {hasCloseBtn && (
          <button
            type="button"
            className="absolute right-4 top-4 h-6 w-6"
            title="모달 닫기"
            onClick={closeModal}
          >
            <IconClose />
          </button>
        )}
        {children}
      </div>
    </div>,
    portalRoot || document.body,
  );
}

export default Modal;
