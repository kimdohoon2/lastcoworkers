'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import {
  PostTaskListRequest,
  useCreateTaskListMutation,
} from '@/app/lib/tasklist/postTaskList';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import Modal from '../common/modal/Modal';
import Button from '../common/button/Button';
import Input from '../common/input/Input';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
}

export default function CreateListModal({
  isOpen,
  onClose,
  groupId,
}: CreateListModalProps) {
  const method = useForm<PostTaskListRequest>();
  const { setError, reset } = method;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateTaskListMutation();

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleSubmit = method.handleSubmit((data) => {
    mutate(
      { groupId, name: data.name.trim() },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['tasklists', groupId],
          });
          onClose();
        },
        onError: (error: unknown) => {
          if (error instanceof AxiosError && error.response?.status === 409) {
            setError('name', {
              type: 'manual',
              message: '이미 존재하는 목록입니다.',
            });
          }
        },
      },
    );
  });

  return (
    <>
      <Modal isOpen={isOpen} closeModal={onClose}>
        <div className="mb-4 flex w-[17.5rem] w-full flex-col gap-4 text-center">
          <p className="text-lg font-medium">새로운 목록 추가</p>
          <p className="text-md text-text-secondary">
            할 일에 대한 목록을 추가하고
            <br />
            목록별 할 일을 만들 수 있습니다.
          </p>
        </div>

        <FormProvider {...method}>
          <form className="w-[17.5rem]" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-6">
              <Input
                name="name"
                title="목록 이름"
                type="text"
                placeholder="할 일 목록을 입력해주세요."
                autoComplete="off"
                validationRules={{
                  required: '할 일 목록을 입력해주세요.',
                  maxLength: {
                    value: 30,
                    message: '할 일 목록은 최대 30글자까지 입력 가능합니다.',
                  },
                  validate: (value) =>
                    value.trim() !== '' ||
                    '할 일 목록은 공백만 입력할 수 없습니다.',
                }}
              />

              <Button
                className="mt-2 w-full text-text-inverse"
                variant="primary"
                size="large"
                type="submit"
                disabled={isPending}
              >
                만들기
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
