'use client';

import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { FrequencyType, RecurringTaskDataBody } from '@/app/types/task';
import { useCreateRecurringTaskMutation } from '@/app/lib/task/postRecurringTask';
import { isFormValid } from '@/app/utils/formValidation';
import { adjustTimeFormat } from '@/app/utils/formatTime';
import Modal from '@/app/components/common/modal/Modal';
import Input from '@/app/components/common/input/Input';
import Button from '@/app/components/common/button/Button';
import RepeatSelector from '@/app/components/tasklist/RepeatSelector';
import DateTimeSelector from '@/app/components/tasklist/DateTimeSeletor';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({
  onClose,
  isOpen,
}: CreateTaskModalProps) {
  const params = useParams();
  const { teamid: groupId, tasklist: taskListId, date: selectedDate } = params;
  const [selectedTime, setSelectedTime] = useState('');

  const [repeatData, setRepeatData] = useState<RecurringTaskDataBody>({
    frequencyType: FrequencyType.ONCE,
  });

  const method = useForm<RecurringTaskDataBody>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      frequencyType: FrequencyType.ONCE,
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateRecurringTaskMutation();

  const { setValue, watch, handleSubmit } = method;
  const allFields = watch();
  const { description, ...fieldsWithoutDescription } = allFields;
  const formValidation = isFormValid(
    fieldsWithoutDescription,
    selectedTime,
    repeatData,
  );

  const onSubmit = (data: RecurringTaskDataBody) => {
    const formattedDate =
      data.startDate || new Date().toISOString().split('T')[0];
    const time = selectedTime ? selectedTime.split(' ')[1] : '00:00';
    const isAM = selectedTime.startsWith('오전');
    const adjustedTime = adjustTimeFormat(time, isAM);

    const formData = {
      ...data,
      ...repeatData,
      startDate: `${formattedDate}T${adjustedTime}Z`,
    };

    mutate(
      {
        groupId: Number(groupId),
        taskListId: Number(taskListId),
        data: formData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              'groups',
              Number(groupId),
              'taskLists',
              Number(taskListId),
              'tasks',
              selectedDate || new Date().toISOString().split('T')[0],
            ],
          });

          method.reset();
          setSelectedTime('');
          onClose();
        },
        onError: (error) => {
          console.error('에러:', error);
        },
      },
    );
  };

  const handleRepeatChange = useCallback((data: RecurringTaskDataBody) => {
    setRepeatData(data);
  }, []);

  const handleClose = () => {
    method.reset();
    setSelectedTime('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} closeModal={handleClose}>
      <div className="custom-scrollbar flex flex-col items-center gap-6 overflow-y-auto px-2">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-lg font-medium">할 일 만들기</p>
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
              title="할 일 제목 *"
              type="text"
              placeholder="할 일 제목을 입력해주세요."
              autoComplete="off"
              validationRules={{
                required: '할 일 제목을 입력해주세요.',
                maxLength: {
                  value: 30,
                  message: '할 일 제목은 최대 30글자까지 입력 가능합니다.',
                },
                validate: (value) =>
                  value.trim() !== '' ||
                  '할 일 제목은 공백만 입력할 수 없습니다.',
              }}
            />

            <DateTimeSelector
              date={allFields.startDate}
              time={selectedTime}
              onDateChange={(date) => setValue('startDate', date)}
              onTimeChange={setSelectedTime}
              disablePastDates
            />

            <div className="flex flex-col gap-3 text-lg font-medium">
              <span>반복 설정 *</span>
              <RepeatSelector onRepeatChange={handleRepeatChange} />
            </div>

            <Input
              name="description"
              title="할 일 메모"
              type="text"
              placeholder="메모를 입력해주세요."
              autoComplete="off"
              validationRules={{
                maxLength: {
                  value: 255,
                  message: '메모는 최대 255글자까지 입력 가능합니다.',
                },
              }}
            />

            <Button
              className="mt-2"
              variant="primary"
              size="large"
              disabled={!formValidation || isPending}
            >
              만들기
            </Button>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}
