'use client';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import ImageUploader from '@/app/components/addboard/ImageUploader';
import Button from '@/app/components/common/button/Button';
import postArticle, { PostArticleRequest } from '@/app/lib/article/postArticle';
import postImage from '@/app/lib/image/postImage';
import { useRouter } from 'next/navigation';
import useToast from '@/app/hooks/useToast';

interface FormValues {
  title: string;
  content: string;
  profile: FileList;
}

export default function AddBoard() {
  const methods = useForm<FormValues>();
  const { handleSubmit } = methods;
  const router = useRouter();
  const { showToast } = useToast();

  const { mutate: postArticleMutate } = useMutation({
    mutationFn: async (formData: PostArticleRequest) => postArticle(formData),
    onSuccess: () => {
      router.push('/boards');
    },
  });

  const imageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      return postImage(formData);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let imageUrl: string | null = null;

    if (data.profile && data.profile.length > 0) {
      const uploadedImage = await imageMutation.mutateAsync(data.profile[0]);
      imageUrl = uploadedImage.url;
    }

    const requestBody: PostArticleRequest = {
      title: data.title,
      content: data.content,
    };

    if (imageUrl) {
      requestBody.image = imageUrl;
    }

    try {
      postArticleMutate(requestBody);
      showToast({ message: '게시글 등록 완료!😊', type: 'success' });
    } catch {
      showToast({ message: '게시글 등록에 실패했어요.🙁', type: 'error' });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center pt-[6.25rem]"
      >
        <div className="flex w-[92%] max-w-[75rem] flex-col">
          <div className="flex items-center justify-between border-b border-text-primary border-opacity-10 pb-6 tablet:pb-8">
            <h1 className="text-2lg tablet:text-xl">게시글 쓰기</h1>
            <Button
              variant="primary"
              size="large"
              className="hidden tablet:flex tablet:w-[11.5rem]"
              type="submit"
            >
              등록
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-8">
            <div>
              <h2 className="mb-4 flex gap-1.5 text-md tablet:text-lg">
                <span className="text-brand-tertiary">*</span>제목
              </h2>
              <input
                placeholder="제목을 입력해주세요."
                className="w-full rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-3 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400 focus:border-interaction-focus focus:outline-none"
                {...methods.register('title', { required: true })}
              />
            </div>
            <div>
              <h3 className="mb-4 flex gap-1.5 text-md tablet:text-lg">
                <span className="text-brand-tertiary">*</span>내용
              </h3>
              <textarea
                placeholder="내용을 입력해주세요."
                className="custom-scrollbar h-[15rem] w-full resize-none rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400 focus:border-interaction-focus focus:outline-none"
                {...methods.register('content', { required: true })}
              />
            </div>
            <div className="mb-10">
              <h4 className="mb-4 flex gap-1.5 text-md tablet:text-lg">
                이미지
              </h4>
              <ImageUploader />
            </div>
          </div>
          <Button
            variant="primary"
            size="large"
            className="mt-10 w-full tablet:hidden"
            type="submit"
          >
            등록
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
