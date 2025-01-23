'use client';

import TeamForm from '@/app/components/team/TeamForm';
import getGroupById from '@/app/lib/group/getGroupById';
import patchGroup from '@/app/lib/group/patchGroup';
import postImage from '@/app/lib/image/postImage';
import { GroupData } from '@/app/types/group';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';

function Page() {
  const router = useRouter();
  const { teamid } = useParams();

  const { data: groupData, isLoading } = useQuery({
    queryKey: ['group', teamid],
    queryFn: () => getGroupById(Number(teamid)),
    enabled: !!teamid, // teamid가 있을 때만 실행
  });

  const onSubmit = async ({ profile, name }: FieldValues) => {
    let imageUrl: string | null = null;

    /**
     * 이미지 업로드
     * 프로필 이미지 선택 안한 경우 생략
     */
    if (profile && profile[0] instanceof File) {
      try {
        const formData = new FormData();

        formData.append('image', profile[0]);

        const {
          data: { url },
        } = await postImage(formData);

        imageUrl = url;
      } catch (error) {
        alert('이미지 업로드에 실패했습니다.');
      }
    }

    /**
     * 팀 생성
     */
    try {
      const teamData: GroupData = {
        name,
      };

      if (imageUrl) {
        teamData.image = imageUrl;
      }

      await patchGroup(Number(teamid), teamData);

      router.push(`/${teamid}`);
    } catch (error) {
      alert('팀 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <div className="mx-auto mt-[3.75rem] max-w-[23.4375rem] px-4 pt-[4.5rem] tablet:w-[28.75rem] tablet:px-0 tablet:pt-[6.25rem]">
        <h2 className="mb-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
          팀 수정하기
        </h2>
        <TeamForm onSubmit={onSubmit}>수정하기</TeamForm>
        <div className="mt-6 text-center text-md text-text-primary tablet:text-lg">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </div>
      </div>
    </div>
  );
}

export default Page;
