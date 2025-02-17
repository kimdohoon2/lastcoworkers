'use client';

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태를 추가
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    },
    [closeModal],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      setIsAnimating(true);
    } else if (!isAnimating) {
      document.body.style.overflow = ''; // 모달이 닫힐 때 바로 처리
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isAnimating, handleKeyDown]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
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

  if (!isOpen && !isAnimating) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-end transition-opacity tablet:justify-center"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div ref={modalRef} className="absolute inset-0 bg-black opacity-50" />
      <div
        className={`relative flex max-h-[80%] w-full transform flex-col items-center overflow-y-hidden rounded-t-xl bg-background-secondary pb-8 pt-12 transition-all duration-300 tablet:w-96 tablet:rounded-b-xl ${isOpen && isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
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
