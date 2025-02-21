'use client';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import IconClose from '@/app/components/icons/IconClose';
import useCloseOnOutsideClickAndEsc from '@/app/hooks/useCloseOnOutsideClickAndEsc';

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

  useCloseOnOutsideClickAndEsc(modalRef, closeModal);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else if (!isAnimating) {
      document.body.style.overflow = ''; // 모달이 닫힐 때 바로 처리
    }

    // clean-up : 모달 언마운트 시 body overflow hidden 삭제
    // 모달 조건부로 렌더링하는 케이스 고려
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isAnimating]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  return createPortal(
    // 모달 내부 드래그 시 이벤트 전파를 막기 위해 추가한 이벤트
    // 이 경우 사용할 수 있는 적절한 역할(role)이 없어 아래 규칙을 비활성화
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-end transition-opacity tablet:justify-center"
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <div
        ref={modalRef}
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
