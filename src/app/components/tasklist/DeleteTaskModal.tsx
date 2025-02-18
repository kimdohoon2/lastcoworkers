import { useAppSelector } from '@/app/stores/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTaskMutation } from '@/app/lib/task/deleteTask';
import ConfirmModal from '@/app/components/common/modal/ConfirmModal';
import useToast from '@/app/hooks/useToast';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess?: () => void;
  groupId: number;
  taskListId: number;
  taskId: number;
}
export default function DeleteTaskModal({
  isOpen,
  onClose,
  onDeleteSuccess,
  groupId,
  taskListId,
  taskId,
}: DeleteTaskModalProps) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const task = useAppSelector((state) => state.tasks.taskById[taskId]);
  const { mutate, isPending } = useDeleteTaskMutation(
    groupId,
    taskListId,
    taskId,
  );

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
        });
        onClose();
        onDeleteSuccess?.();
        showToast({ message: '할 일 단일 삭제 완료!😊', type: 'success' });
      },
      onError: () => {
        showToast({
          message: '할 일 단일 삭제에 실패했어요.🙁',
          type: 'error',
        });
      },
    });
  };

  return (
    <ConfirmModal
      isModalOpen={isOpen}
      title={
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xl text-text-primary">{`'${task.name}'`}</p>
          <p className="text-lg text-text-primary">
            할 일을 정말 삭제하시겠어요?
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
