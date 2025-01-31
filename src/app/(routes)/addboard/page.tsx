'use client';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import ImageUploader from '@/app/components/addboard/ImageUploader';
import Button from '@/app/components/common/button/Button';

interface FormValues {
  title: string;
  content: string;
  profile: FileList;
}

export default function AddBoard() {
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center pt-[6.25rem]"
      >
        <div className="flex w-[92%] max-w-[75rem] flex-col">
          <div className="flex items-center justify-between border-b border-text-primary border-opacity-10 pb-6 tablet:pb-8">
            <h1 className="text-2lg">게시글 쓰기</h1>
            <Button
              variant="primary"
              size="large"
              className="hidden tablet:flex tablet:w-[11.5rem]"
            >
              등록
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-8">
            <div>
              <h2 className="mb-4 flex gap-1.5 text-md">
                <span className="text-brand-tertiary">*</span>제목
              </h2>
              <input
                placeholder="제목을 입력해주세요."
                className="w-full rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-3 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400"
                {...methods.register('title')}
              />
            </div>
            <div>
              <h3 className="mb-4 flex gap-1.5 text-md">
                <span className="text-brand-tertiary">*</span>내용
              </h3>
              <textarea
                placeholder="내용을 입력해주세요."
                className="h-[15rem] w-full rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400"
                {...methods.register('content')}
              />
            </div>
            <div>
              <h4 className="mb-4 flex gap-1.5 text-md">이미지</h4>
              <ImageUploader />
            </div>
          </div>
          <Button
            variant="primary"
            size="large"
            className="mt-10 w-full tablet:hidden"
          >
            등록
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
