'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { PostTaskListRequest } from '@/app/lib/tasklist/postTaskList';
import Modal from '../common/modal/Modal';
import Button from '../common/button/Button';
import Input from '../common/input/Input';

interface CreateListModalProps {
  onClose: () => void;
}

export default function CreateListModal({ onClose }: CreateListModalProps) {
  const method = useForm<PostTaskListRequest>();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal isOpen closeModal={handleClose}>
        <div className="mb-4 flex w-[17.5rem] w-full flex-col gap-4 text-center">
          <p className="text-lg font-medium">새로운 목록 추가</p>
          <p className="text-md text-text-secondary">
            할 일에 대한 목록을 추가하고
            <br />
            목록별 할 일을 만들 수 있습니다.
          </p>
        </div>

        <FormProvider {...method}>
          <form className="w-[17.5rem]">
            <div className="flex w-full flex-col gap-6">
              <Input
                name="name"
                title="목록 이름"
                type="text"
                placeholder="목록 이름을 입력해주세요."
                autoComplete="off"
              />

              <Button
                className="mt-2 w-full text-text-inverse"
                variant="primary"
                size="large"
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
