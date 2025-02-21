import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTaskQuery } from '@/app/lib/task/getTask';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { formatDateShort } from '@/app/utils/formatDate';
import { useEditTaskMutation } from '@/app/lib/task/patchTask';
import { useTaskCommentQuery } from '@/app/lib/comment/getComment';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Input from '@/app/components/common/input/Input';
import Button from '@/app/components/common/button/Button';
import IconCheck from '@/app/components/icons/IconCheck';
import IconCancel from '@/app/components/icons/IconCancel';
import TaskComment from '@/app/components/taskdetail/TaskComment';
import DateRepeatInfo from '@/app/components/tasklist/DateRepeatInfo';
import TaskDetailProfile from '@/app/components/icons/TaskDetailProfile';
import TaskDetailDropdown from '@/app/components/taskdetail/TaskDetailDropdown';
import TaskDetailSkeleton from '@/app/components/taskdetail/TaskDetailSkeleton';
import useToast from '@/app/hooks/useToast';

interface TaskDetailProps {
  groupId: number;
  taskListId: number;
  taskId: number | undefined;
  onClose: () => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function TaskDetail({
  groupId,
  taskListId,
  taskId,
  onClose,
  setIsModalOpen,
}: TaskDetailProps) {
  const queryClient = useQueryClient();
  const { mutate: editTask, isPending } = useEditTaskMutation();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: task,
    isLoading: isTaskLoading,
    error: taskError,
  } = useTaskQuery(groupId, taskListId, Number(taskId));

  const { isLoading: isCommentLoading, error: commentError } =
    useTaskCommentQuery(Number(taskId));

  const isLoading = isTaskLoading || isCommentLoading;

  const methods = useForm({
    mode: 'onChange',
    defaultValues: { name: '', description: '' },
  });

  const { showToast } = useToast();

  const {
    register,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (task) {
      reset({ name: task.name || '', description: task.description || '' });
    }
  }, [task, reset]);

  if (!taskId) return <p>할 일 ID가 없습니다.</p>;
  if (isLoading) return <TaskDetailSkeleton />;
  if (taskError || commentError)
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  if (!task) return <p>데이터가 존재하지 않습니다.</p>;

  const { doneAt, date, frequency, writer, recurring } = task;
  const { name: nameValue, description: descriptionValue } = watch();

  const toggleDone = () => {
    const newDoneState = !doneAt;

    editTask(
      {
        groupId,
        taskListId,
        taskId,
        name: nameValue,
        description: descriptionValue,
        done: newDoneState,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
          if (newDoneState) {
            showToast({ message: '할 일 완료!🎉', type: 'success' });
          }
        },
        onError: () => {
          showToast({
            message: '할 일 상태 변경에 실패했어요.🙁',
            type: 'error',
          });
        },
      },
    );
  };

  const handleEditTask = async () => {
    const isValid = await trigger('name');
    if (!isValid) return;

    editTask(
      {
        groupId,
        taskListId,
        taskId,
        name: nameValue,
        description: descriptionValue,
        done: !!doneAt,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
          setIsEditing(false);
          showToast({ message: '할 일 수정 완료!😊', type: 'success' });
        },
        onError: () => {
          showToast({ message: '할 일 수정에 실패했어요.🙁', type: 'error' });
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <div className="custom-scrollbar max-h-[100vh] overflow-y-auto p-4 tablet:p-6 xl:p-10">
        <div className="flex flex-col gap-3">
          <button className="h-6 w-6" onClick={onClose}>
            <IconCancel />
          </button>
          {doneAt && (
            <p className="flex items-center gap-1.5 text-xs text-brand-tertiary">
              <IconCheck /> 완료
            </p>
          )}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <div className="w-full">
                  <Input
                    {...register('name', {
                      required: '할 일 제목을 입력해주세요.',
                      maxLength: {
                        value: 30,
                        message:
                          '할 일 제목은 최대 30글자까지 입력 가능합니다.',
                      },
                      validate: (value) =>
                        value.trim() !== '' ||
                        '할 일 제목에 공백만 입력할 수 없습니다.',
                    })}
                    name="name"
                    title=""
                    type="text"
                    placeholder="할 일 제목을 입력하세요."
                    autoComplete="off"
                  />
                </div>
              ) : (
                <span className={`text-xl ${doneAt ? 'line-through' : ''}`}>
                  {nameValue}
                </span>
              )}
              <TaskDetailDropdown
                groupId={groupId}
                taskListId={taskListId}
                taskId={taskId}
                setIsModalOpen={setIsModalOpen}
                onDeleteSuccess={onClose}
                onEdit={() => setIsEditing(true)}
              />
            </div>

            <div className="flex items-center justify-between text-md">
              <div className="flex items-center gap-3">
                {writer.image ? (
                  <Image
                    src={writer.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <TaskDetailProfile />
                )}
                <p className="text-md">{writer.nickname}</p>
              </div>
              <p className="text-text-secondary">
                {formatDateShort(recurring?.createdAt)}
              </p>
            </div>
            <DateRepeatInfo
              date={date}
              frequency={frequency}
              startDate={recurring?.startDate}
              showStartTime
            />
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-3">
              <textarea
                {...register('description', {
                  maxLength: {
                    value: 255,
                    message: '메모는 최대 255글자까지 입력 가능합니다.',
                  },
                })}
                placeholder="메모를 입력하세요."
                autoComplete="off"
                className={`custom-scrollbar placeholder:text-text-danger h-[6rem] w-full resize-none rounded-xl border border-[#F8FAFC1A] bg-background-secondary px-4 py-[0.85rem] text-text-primary placeholder:text-lg focus:border-interaction-focus focus:outline-none tablet:h-[8rem] xl:h-[10rem] ${
                  errors.description
                    ? 'border-status-danger'
                    : 'border-[#F8FAFC1A]'
                }`}
              />
              {errors.description && (
                <span className="text-sm text-status-danger">
                  {errors.description?.message as string}
                </span>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="cancel"
                  size="small"
                  onClick={() => {
                    reset();
                    setIsEditing(false);
                  }}
                >
                  취소
                </Button>
                <Button
                  variant="complete"
                  size="small"
                  onClick={handleEditTask}
                  disabled={!nameValue.trim() || isPending}
                >
                  수정
                </Button>
              </div>
            </div>
          ) : (
            <p className="my-3 min-h-[6rem] break-words tablet:min-h-[8rem] xl:min-h-[10rem]">
              {descriptionValue}
            </p>
          )}
          <TaskComment taskId={taskId} setIsModalOpen={setIsModalOpen} />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: 'easeOut' },
            }}
            exit={{
              opacity: 0,
              transition: {
                opacity: { duration: 0, ease: 'easeIn' },
                ease: 'easeIn',
              },
            }}
            className="fixed bottom-6 right-4 tablet:bottom-5 tablet:right-6 xl:bottom-10 xl:right-10"
          >
            <Button
              variant={doneAt ? 'cancel' : 'complete'}
              size={doneAt ? 'cancel' : 'complete'}
              onClick={toggleDone}
              className="transform duration-200"
            >
              <IconCheck />
              {doneAt ? '완료 취소하기' : '완료하기'}
            </Button>
          </motion.div>
        </div>
      </div>
    </FormProvider>
  );
}

export default TaskDetail;
