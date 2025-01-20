'use client';

import Modal from '@/app/components/common/modal/Modal';
import useModal from '@/app/hooks/useModal';

function ModalExample() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleClose = () => {
    /* 이벤트 핸들러 등록 */
    closeModal();
  };

  const handleSendLink = () => {
    /* 이벤트 핸들러 등록 */
    closeModal();
  };

  return (
    <div>
      <button
        className="h-8 w-20 bg-white text-lg font-medium text-black"
        onClick={openModal}
      >
        모달 열기
      </button>
      {/* {isOpen && ( */}
      <Modal isOpen={isOpen} closeModal={handleClose}>
        {/**
         * Modal 컨텐츠 영역
         * 피그마 예시를 보여주기 위해 디자인에 맞춰 임시로 width: 280px 적용
         * 작업하실 때 width나 padding으로 조절
         */}
        <div className="w-[280px]">
          <div className="mb-2 text-center text-lg font-medium">
            비밀번호 재설정
          </div>
          <div className="mb-4 text-center text-md text-text-secondary">
            비밀번호 재설정 링크를 보내드립니다.
          </div>
          <input
            className="mb-6 w-full rounded-xl border border-border-primary bg-background-secondary px-4 py-[14.5px] text-lg"
            placeholder="이메일을 입력하세요."
          />
          <div className="flex h-12 gap-2">
            <button
              onClick={handleClose}
              className="flex-1 rounded-xl bg-white text-lg font-semibold text-brand-primary"
            >
              닫기
            </button>
            <button
              onClick={handleSendLink}
              className="flex-1 rounded-xl bg-brand-primary text-lg font-semibold text-white"
            >
              링크 보내기
            </button>
          </div>
        </div>
      </Modal>
      {/* )} */}
    </div>
  );
}

export default ModalExample;
