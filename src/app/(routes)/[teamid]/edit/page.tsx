'use client';

import TeamForm from '@/app/components/team/TeamForm';
import useRedirectLogin from '@/app/hooks/useRedirectLogin';
import getGroupById from '@/app/lib/group/getGroupById';
import patchGroup from '@/app/lib/group/patchGroup';
import postImage from '@/app/lib/image/postImage';
import { GroupData } from '@/app/types/group';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';

function Page() {
  const router = useRouter();
  const { teamid } = useParams();
  const queryClient = useQueryClient();

  const { data: groupData, isLoading } = useQuery({
    queryKey: ['group', teamid],
    queryFn: () => getGroupById(Number(teamid)),
    enabled: !!teamid, // teamid가 있을 때만 실행
  });

  const mutation = useMutation({
    mutationFn: async ({ profile, name }: FieldValues) => {
      let imageUrl: string | null = null;

      // 이미지 업로드 (선택된 경우만)
      if (profile && profile[0] instanceof File) {
        const formData = new FormData();
        formData.append('image', profile[0]);

        const { url } = await postImage(formData);
        imageUrl = url;
      }

      // 업데이트할 데이터 생성
      const teamData: GroupData = { name };
      if (imageUrl) teamData.image = imageUrl;

      // 그룹 데이터 업데이트
      await patchGroup(Number(teamid), teamData);
    },
    onSuccess: () => {
      // 캐시 업데이트 및 페이지 이동
      queryClient.invalidateQueries({ queryKey: ['group', Number(teamid)] });
      router.push(`/${teamid}`);
    },
    onError: () => {
      alert('팀 수정에 실패했습니다.');
    },
  });

  useRedirectLogin();

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
