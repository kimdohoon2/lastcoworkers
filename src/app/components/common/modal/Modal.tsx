'use client';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import IconClose from '@/app/components/icons/IconClose';

interface ModalProps {
  hasCloseBtn?: boolean;
  portalRoot?: HTMLElement;
  isOpen: boolean;
  closeModal: () => void;
}

function Modal({
  hasCloseBtn = true,
  portalRoot, // Modal 렌더링할 상위 DOM 노드
  closeModal,
  isOpen,
  children,
}: PropsWithChildren<ModalProps>) {
  const [renderModal, setRenderModal] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setRenderModal(true); // isOpen이 true면 렌더링 활성화
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setRenderModal(false); // 애니메이션 종료 후 렌더링 중단
      document.body.style.overflow = '';
    }
  };

  useEffect(() => {
    // 모달 외부 클릭 시 닫히도록 이벤트 처리
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    // 마운트 시 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    // clean-up : 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  if (!renderModal) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-end transition-opacity tablet:justify-center ${
        isOpen ? 'opacity-100' : 'pointer-events-none hidden opacity-0'
      }`}
      style={{ display: renderModal ? 'flex' : 'none' }}
    >
      <div ref={modalRef} className="absolute inset-0 bg-black opacity-50" />
      <div
        className={`relative flex max-h-[80%] w-full transform flex-col items-center overflow-y-hidden rounded-t-xl bg-background-secondary pb-8 pt-12 transition-transform tablet:w-96 tablet:rounded-b-xl ${isOpen ? 'translate-y-0' : 'translate-y-4'}`}
        onTransitionEnd={handleAnimationEnd}
      >
        {hasCloseBtn && (
          <button
            type="button"
            className="absolute right-4 top-4 h-6 w-6 transition-all duration-200 hover:scale-90 hover:opacity-85"
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
