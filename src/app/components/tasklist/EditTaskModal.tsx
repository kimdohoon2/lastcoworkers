import { FormProvider, useForm } from 'react-hook-form';
import { useEditTaskMutation } from '@/app/lib/task/patchTask';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Button from '../common/button/Button';
import Input from '../common/input/Input';
import Modal from '../common/modal/Modal';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  taskListId: number;
  taskId: number;
  taskName: string;
  description: string;
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
  taskName,
  description,
}: EditTaskModalProps) {
  const queryClient = useQueryClient();
  const methods = useForm<FormValues>({
    defaultValues: {
      task: taskName,
      memo: description,
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
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
          alert('할 일이 성공적으로 수정되었습니다.');
          onClose();
        },
        onError: () => {
          alert('할 일을 수정하는 데 실패했습니다.');
        },
      },
    );
  };

  useEffect(() => {
    if (isOpen) {
      methods.reset({ task: taskName, memo: description });
    }
  }, [isOpen, taskName, description, methods]);

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
            <p className="text-xl text-text-primary">할 일 수정하기</p>
            <p className="text-lg text-text-primary">
              할 일과 메모를 수정해보세요.
            </p>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Input
                {...methods.register('task')}
                name="task"
                title="할 일"
                type="text"
                placeholder={`${taskName}`}
                autoComplete="off"
              />
              <Input
                {...methods.register('memo')}
                name="memo"
                title="메모"
                type="text"
                placeholder={`${description}`}
                autoComplete="off"
              />
              <p className="text-md text-text-secondary" />

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
                <Button
                  className="w-[8.5rem] text-text-inverse"
                  variant="primary"
                  size="large"
                >
                  수정하기
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </Modal>
    </div>
  );
}
