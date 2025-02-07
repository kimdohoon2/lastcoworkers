'use client';

import TeamForm from '@/app/components/team/TeamForm';
import useRedirectLogin from '@/app/hooks/useRedirectLogin';
import getGroupById from '@/app/lib/group/getGroupById';
import patchGroup from '@/app/lib/group/patchGroup';
import { GroupData } from '@/app/types/group';
import uploadImage from '@/app/utils/uploadImage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';

function Page() {
  const { isLoading: isAuthLoading } = useRedirectLogin();

  const router = useRouter();
  const { teamid } = useParams();
  const queryClient = useQueryClient();
  const groupId = Number(teamid);

  const { data: groupData, isLoading } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () => getGroupById(groupId),
    enabled: !!groupId,
  });

  const mutation = useMutation({
    mutationFn: async ({ profile, name }: FieldValues) => {
      const imageUrl = await uploadImage(profile);

      const teamData: GroupData = { name };
      if (imageUrl) teamData.image = imageUrl;

      await patchGroup(groupId, teamData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      router.push(`/${groupId}`);
    },
    onError: () => {
      alert('팀 수정에 실패했습니다.');
    },
  });

  if (isAuthLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white opacity-50">
        로그인 정보 확인중...
      </div>
    );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto mt-[3.75rem] max-w-[23.4375rem] px-4 pt-[4.5rem] tablet:w-[28.75rem] tablet:px-0 tablet:pt-[6.25rem]">
        <h2 className="mb-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
          팀 수정하기
        </h2>
        <TeamForm
          initialImage={groupData?.image ?? undefined}
          initialName={groupData?.name}
          onSubmit={mutation.mutate}
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
