'use client';

import AuthCheckLoading from '@/app/components/common/auth/AuthCheckLoading';
import TeamForm from '@/app/components/team/TeamForm';
import useAuthRedirect from '@/app/hooks/useAuthRedirect';
import getGroupById from '@/app/lib/group/getGroupById';
import patchGroup from '@/app/lib/group/patchGroup';
import { GroupData } from '@/app/types/group';
import uploadImage from '@/app/utils/uploadImage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { useState } from 'react';
import Loading from '@/app/components/common/loading/Loading';
import useRedirectIfNotFound from '@/app/hooks/useRedirectIfNotFound';
import useRedirectIfNotMember from '@/app/hooks/useRedirectIfNotMember';
import useToast from '@/app/hooks/useToast';

function Page() {
  const { isLoading: isAuthLoading } = useAuthRedirect();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { teamid } = useParams();
  const queryClient = useQueryClient();
  const groupId = Number(teamid);
  const { showToast } = useToast();

  const {
    data: groupData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () => getGroupById(groupId),
    enabled: !!groupId,
  });

  const mutation = useMutation({
    mutationFn: async ({ profile, name }: FieldValues) => {
      setIsSubmitting(true);
      const imageUrl = await uploadImage(profile);

      const teamData: GroupData = { name };
      if (imageUrl) teamData.image = imageUrl;

      await patchGroup(groupId, teamData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      showToast({ message: '팀 수정 완료!😊', type: 'success' });
      router.push(`/${groupId}`);
    },
    onError: () => {
      showToast({ message: '팀 수정에 실패했어요.🙁', type: 'error' });
      setIsSubmitting(false);
    },
  });

  const isNotFound =
    (error && error.message === 'not_found') || Number.isNaN(Number(teamid));

  const { isRedirecting } = useRedirectIfNotFound(isNotFound);

  const { isRedirecting: isRedirectingMember } = useRedirectIfNotMember({
    isLoading,
    groupData,
  });
  if (isAuthLoading) return <AuthCheckLoading />;
  if (isLoading || isRedirecting || isRedirectingMember) return <Loading />;

  return (
    <div>
      <div className="mx-auto flex h-screen max-w-[23.4375rem] flex-col justify-center px-4 tablet:w-[28.75rem] tablet:px-0">
        <h2 className="my-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
          팀 수정하기
        </h2>
        <TeamForm
          initialImage={groupData?.image ?? undefined}
          initialName={groupData?.name}
          onSubmit={mutation.mutate}
          isLoading={isSubmitting}
        >
          수정하기
        </TeamForm>
        <div className="mt-6 text-center text-md text-text-primary tablet:text-lg">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </div>
      </div>
    </div>
  );
}

export default Page;
