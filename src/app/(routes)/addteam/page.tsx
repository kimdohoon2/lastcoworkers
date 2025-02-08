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

function Page() {
  const { isLoading } = useAuthRedirect();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

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
      router.push(`/${id}`);
    },
    onError: () => {
      alert('팀 생성에 실패했습니다.');
      setIsSubmitting(false);
    },
  });

  if (isLoading) return <AuthCheckLoading />;

  return (
    <div>
      <div className="mx-auto mt-[3.75rem] max-w-[23.4375rem] px-4 pt-[4.5rem] tablet:w-[28.75rem] tablet:px-0 tablet:pt-[6.25rem]">
        <h2 className="mb-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
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
