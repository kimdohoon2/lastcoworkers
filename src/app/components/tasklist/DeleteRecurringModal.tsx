import { useAppSelector } from '@/app/stores/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteRecurringMutation } from '@/app/lib/task/deleteTask';
import ConfirmModal from '@/app/components/common/modal/ConfirmModal';

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
  const { mutate, isPending } = useDeleteRecurringMutation();

  const handleDelete = () => {
    mutate(
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
    <ConfirmModal
      isModalOpen={isOpen}
      title={
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xl text-text-primary">{`'${task.name}'`}</p>
          <p className="text-lg text-text-primary">
            할 일의 반복을 정말 삭제하시겠어요?
          </p>
          <p className="text-md text-text-secondary">
            삭제 후에는 되돌릴 수 없습니다.
          </p>
        </div>
      }
      cancelLabel="닫기"
      confirmLabel="삭제하기"
      handleCancel={(e) => {
        if (e) e.stopPropagation();
        onClose();
      }}
      handleConfirm={handleDelete}
      isConfirmDisabled={isPending}
    />
  );
}
