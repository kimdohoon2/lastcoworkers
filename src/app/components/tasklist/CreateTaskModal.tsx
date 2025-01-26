'use client';

import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FrequencyType, RecurringTaskDataBody } from '@/app/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createRecurringTask } from '@/app/lib/task/postRecurringTask';
import Modal from '../common/modal/Modal';
import Input from '../common/input/Input';
import Button from '../common/button/Button';

import RepeatSelector from './RepeatSelector';
import { useParams } from 'next/navigation';
import { isFormValid } from '@/app/utils/formValidation';
import DateTimeSelector from './DateTimeSeletor';
import { adjustTimeFormat } from '@/app/utils/formatTime';

interface CreateTaskModalProps {
  onClose: () => void;
}

export default function CreateTaskModal({ onClose }: CreateTaskModalProps) {
  const params = useParams();
  const { groupId, taskListId, date } = params;
  const [selectedTime, setSelectedTime] = useState('');

  const [repeatData, setRepeatData] = useState<RecurringTaskDataBody>({
    frequencyType: FrequencyType.ONCE,
  });

  const method = useForm<RecurringTaskDataBody>({
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      frequencyType: FrequencyType.ONCE,
    } as RecurringTaskDataBody,
  });
  const { setValue, watch, handleSubmit } = method;
  const allFields = watch();
  const queryClient = useQueryClient();

  const createRecurringTaskMutation = useMutation({
    mutationFn: createRecurringTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'groups',
          Number(groupId),
          'taskLists',
          Number(taskListId),
          'tasks',
          date || new Date().toISOString().split('T')[0],
        ],
      });

      onClose();
    },
    onError: (error) => {
      console.error('에러:', error);
    },
  });

  const formValidation = isFormValid(allFields, selectedTime, repeatData);

  const onSubmit = (data: RecurringTaskDataBody) => {
    const date = data.startDate || new Date().toISOString().split('T')[0];
    const time = selectedTime ? selectedTime.split(' ')[1] : '00:00';
    const isAM = selectedTime.startsWith('오전');
    const adjustedTime = adjustTimeFormat(time, isAM);

    const formData = {
      ...data,
      ...repeatData,
      startDate: `${date}T${adjustedTime}Z`,
    };

    createRecurringTaskMutation.mutate({
      groupId: Number(groupId),
      taskListId: Number(taskListId),
      data: formData,
    });
  };

  const handleRepeatChange = useCallback((data: RecurringTaskDataBody) => {
    setRepeatData(data);
  }, []);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal isOpen={true} closeModal={handleClose}>
        <div className="custom-scrollbar flex flex-col items-center gap-6 overflow-y-scroll px-2">
          <div className="flex w-full flex-col gap-4 text-center">
            <p className="text-lg">할 일 만들기</p>
            <p className="text-md text-text-default">
              할 일은 실제로 행동 가능한 작업 중심으로
              <br />
              작성해주시면 좋습니다.
            </p>
          </div>

          <FormProvider {...method}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-[21rem] flex-col gap-6"
            >
              <Input
                name="name"
                title="할 일 제목"
                type="text"
                placeholder="할 일 제목을 입력해주세요."
                autoComplete="off"
              />
              <DateTimeSelector
                date={allFields.startDate}
                time={selectedTime}
                onDateChange={(date) => setValue('startDate', date)}
                onTimeChange={setSelectedTime}
              />
              <div>반복 설정</div>
              <RepeatSelector onRepeatChange={handleRepeatChange} />
              <Input
                name="description"
                title="할 일 메모 *"
                type="text"
                placeholder="메모를 입력해주세요."
                autoComplete="off"
              />
              <Button
                className="mt-2 text-text-inverse"
                variant="primary"
                size="large"
                disabled={!formValidation}
              >
                만들기
              </Button>
            </form>
          </FormProvider>
        </div>
      </Modal>
    </>
  );
}
