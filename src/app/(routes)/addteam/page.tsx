'use client';

import { FieldValues } from 'react-hook-form';
import postGroup from '@/app/lib/group/postGroup';
import { GroupData } from '@/app/types/group';
import TeamForm from '@/app/components/team/TeamForm';
import { useRouter } from 'next/navigation';
import useAuthRedirect from '@/app/hooks/useAuthRedirect';
import { useMutation } from '@tanstack/react-query';
import uploadImage from '@/app/utils/uploadImage';
import AuthCheckLoading from '@/app/components/common/auth/AuthCheckLoading';
import { useState } from 'react';
import useToast from '@/app/hooks/useToast';

function Page() {
  const { isLoading } = useAuthRedirect();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({ profile, name }: FieldValues) => {
      setIsSubmitting(true);
      const imageUrl = await uploadImage(profile);

      const teamData: GroupData = {
        name,
      };

      if (imageUrl) {
        teamData.image = imageUrl;
      }

      return postGroup(teamData);
    },
    onSuccess: ({ id }) => {
      showToast({ message: '팀 생성 완료!😊', type: 'success' });
      router.push(`/${id}`);
    },
    onError: () => {
      showToast({ message: '팀 생성에 실패했어요.🙁', type: 'error' });
      setIsSubmitting(false);
    },
  });

  if (isLoading) return <AuthCheckLoading />;

  return (
    <div>
      <div className="mx-auto flex h-screen max-w-[23.4375rem] flex-col justify-center px-4 tablet:w-[28.75rem] tablet:px-0">
        <h2 className="my-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
          팀 생성하기
        </h2>
        <TeamForm onSubmit={mutation.mutate} isLoading={isSubmitting}>
          생성하기
        </TeamForm>
        <div className="mt-6 text-center text-md text-text-primary tablet:text-lg">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </div>
      </div>
    </div>
  );
}

export default Page;
