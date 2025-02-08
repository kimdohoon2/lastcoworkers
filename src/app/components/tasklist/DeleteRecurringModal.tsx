import { useDeleteRecurringMutation } from '@/app/lib/task/deleteTask';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@/app/stores/hooks';
import Button from '../common/button/Button';
import Modal from '../common/modal/Modal';
import IconAlert from '../icons/IconAlert';

interface DeleteRecurringModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess?: () => void;
  groupId: number;
  taskListId: number;
  taskId: number;
}
export default function DeleteRecurringModal({
  isOpen,
  onClose,
  onDeleteSuccess,
  groupId,
  taskListId,
  taskId,
}: DeleteRecurringModalProps) {
  const queryClient = useQueryClient();
  const task = useAppSelector((state) => state.tasks.taskById[taskId]);
  const deleteRecurringMutation = useDeleteRecurringMutation();

  const handleDelete = () => {
    deleteRecurringMutation.mutate(
      {
        groupId,
        taskListId,
        taskId,
        recurringId: task.recurringId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });

          onClose();
          onDeleteSuccess?.();
        },
        onError: (error) => {
          console.error('반복 삭제 실패:', error);
        },
      },
    );
  };

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
      className={`${isOpen ? 'block' : 'hidden'}`}
    >
      <Modal isOpen={isOpen} closeModal={onClose}>
        <div className="flex flex-col items-center gap-2 text-center">
          <IconAlert />
          <p className="mt-2 text-xl text-text-primary">{`'${task.name}'`}</p>
          <p className="text-lg text-text-primary">
            할 일의 반복을 정말 삭제하시겠어요?
          </p>
          <p className="text-md text-text-secondary">
            삭제 후에는 되돌릴 수 없습니다.
          </p>

          <div className="mt-5 flex gap-2">
            <Button
              type="button"
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
            <Button
              type="button"
              className="w-[8.5rem]"
              variant="danger"
              size="large"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
