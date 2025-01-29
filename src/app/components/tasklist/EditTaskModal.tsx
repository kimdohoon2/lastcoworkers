import { FormProvider, useForm } from 'react-hook-form';
import { useEditTaskMutation } from '@/app/lib/task/patchTask';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@/app/stores/hooks';
import Button from '../common/button/Button';
import Input from '../common/input/Input';
import Modal from '../common/modal/Modal';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  taskListId: number;
  taskId: number;
}

interface FormValues {
  task: string;
  memo: string;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  groupId,
  taskListId,
  taskId,
}: EditTaskModalProps) {
  const queryClient = useQueryClient();
  const task = useAppSelector((state) => state.tasks.tasks[taskId]);

  const methods = useForm<FormValues>({
    defaultValues: {
      task: task?.name || '',
      memo: task?.description || '',
    },
  });

  const { mutate } = useEditTaskMutation();

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        groupId,
        taskListId,
        taskId,
        name: data.task,
        description: data.memo,
        done: !!task?.doneAt,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
          onClose();
        },
        onError: () => {},
      },
    );
  };

  useEffect(() => {
    if (isOpen && task) {
      methods.reset({
        task: task.name,
        memo: task.description || '',
      });
    }
  }, [isOpen, task, methods]);

  if (!task) {
    return null;
  }

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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 text-center">
            <p className="mb-2 text-xl text-text-primary">할 일 수정하기</p>
            <p className="text-lg text-text-secondary">
              할 일과 메모를 수정해보세요.
            </p>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <Input
                  {...methods.register('task')}
                  name="task"
                  title="할 일 제목"
                  type="text"
                  placeholder={task.name}
                  autoComplete="off"
                />
                <Input
                  {...methods.register('memo')}
                  name="memo"
                  title="할 일 메모"
                  type="text"
                  placeholder={task.description || '메모를 입력하세요.'}
                  autoComplete="off"
                />

                <div className="mt-2 flex gap-2">
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
                    className="w-[8.5rem] text-text-inverse"
                    variant="primary"
                    size="large"
                  >
                    수정하기
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </Modal>
    </div>
  );
}
