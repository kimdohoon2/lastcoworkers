import { motion } from 'framer-motion';
import { useTaskQuery } from '@/app/lib/task/getTask';
import { formatDateShort } from '@/app/utils/formatDate';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { useEditTaskMutation } from '@/app/lib/task/patchTask';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTaskCommentQuery } from '@/app/lib/comment/getComment';
import Input from '../common/input/Input';
import Button from '../common/button/Button';
import IconCheck from '../icons/IconCheck';
import IconCancel from '../icons/IconCancel';
import TaskDetailProfile from '../icons/TaskDetailProfile';
import TaskDetailDropdown from './TaskDetailDropdown';
import DateRepeatInfo from '../tasklist/DateRepeatInfo';
import TaskComments from './TaskComment';
import TaskDetailSkeleton from './TaskDetailSkeleton';

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
  const { mutate: editTask } = useEditTaskMutation();
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
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { register, reset, watch, trigger } = methods;

  useEffect(() => {
    if (task) {
      reset({
        name: task.name || '',
        description: task.description || '',
      });
    }
  }, [task, reset]);

  if (!taskId) return <p>할 일 ID가 없습니다.</p>;
  if (isLoading) return <TaskDetailSkeleton />;
  if (taskError || commentError)
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  if (!task) return <p>데이터가 존재하지 않습니다.</p>;

  const { doneAt, date, frequency, writer, recurring } = task;
  const startDate = recurring?.startDate;
  const createDate = recurring?.createdAt;

  const nameValue = watch('name');
  const descriptionValue = watch('description');

  const toggleDone = () => {
    editTask(
      {
        groupId,
        taskListId,
        taskId,
        name: nameValue,
        description: descriptionValue,
        done: !doneAt,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
        },
        onError: () => {
          alert('할 일 상태 변경에 실패했습니다.');
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
        },
        onError: () => {
          alert('할 일 수정에 실패했습니다.');
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
                    name="name"
                    title=""
                    type="text"
                    placeholder="할 일 제목을 입력하세요."
                    autoComplete="off"
                    validationRules={{
                      required: '할 일 제목을 입력해주세요.',
                      minLength: {
                        value: 1,
                        message: '할 일 제목은 최소 1글자 이상이어야 합니다.',
                      },

                      validate: (value) =>
                        value.trim() !== '' ||
                        '할 일 제목에 공백만 입력할 수 없습니다.',
                    }}
                    className="w-full rounded-xl border border-[#F8FAFC1A] bg-background-secondary px-4 py-[0.85rem] text-xl text-text-primary focus:border-interaction-focus focus:outline-none"
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
                  />
                ) : (
                  <TaskDetailProfile />
                )}
                <p className="text-md">{writer.nickname}</p>
              </div>
              <p className="text-text-secondary">
                {formatDateShort(createDate)}
              </p>
            </div>
            <DateRepeatInfo
              date={date}
              frequency={frequency}
              startDate={startDate}
              showStartDate
            />
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-3">
              <textarea
                {...register('description')}
                placeholder="메모를 입력하세요."
                autoComplete="off"
                className="custom-scrollbar placeholder:text-text-danger h-[6rem] w-full resize-none rounded-xl border border-[#F8FAFC1A] bg-background-secondary px-4 py-[0.85rem] text-text-primary placeholder:text-lg focus:border-interaction-focus focus:outline-none tablet:h-[8rem] xl:h-[10rem]"
              />
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
                  disabled={!nameValue.trim()}
                >
                  수정
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-3 h-[6rem] break-words tablet:h-[8rem] xl:h-[10rem]">
              {descriptionValue}
            </p>
          )}
          <TaskComments taskId={taskId} setIsModalOpen={setIsModalOpen} />
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
