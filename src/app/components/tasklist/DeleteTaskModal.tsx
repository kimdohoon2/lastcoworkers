import Button from '../common/button/Button';
import Modal from '../common/modal/Modal';
import IconAlert from '../icons/IconAlert';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteTaskModal({
  isOpen,
  onClose,
}: DeleteTaskModalProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
    >
      <Modal isOpen={isOpen} closeModal={onClose}>
        <div className="flex flex-col items-center gap-4 text-center">
          <IconAlert />
          <p className="text-lg text-text-primary">
            할 일을 정말 삭제하시겠어요?
          </p>
          <p className="text-md text-text-secondary">
            삭제 후에는 되돌릴 수 없습니다.
          </p>

          <div className="mt-2 flex gap-2">
            <Button
              className="w-[8.5rem] text-text-default"
              variant="secondary"
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              닫기
            </Button>
            <Button className="w-[8.5rem]" variant="danger" size="large">
              삭제하기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
