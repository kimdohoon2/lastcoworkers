'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import getGroup from '@/app/lib/group/getGroup';
import TeamHeader from '@/app/components/team/TeamHeader';
import TodoList from '@/app/components/team/TodoList';
import Report from '@/app/components/team/Report';

import MemberContainer from '@/app/components/team/MemberContainer';

export default function TeamPage() {
  // URL에서 teamId 가져오기
  const pathname = usePathname();
  const teamId = pathname?.split('/').filter(Boolean).pop();
  const groupId = teamId ? Number(teamId) : undefined;

  // 그룹 정보 가져오기
  const {
    data: groupData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () =>
      groupId
        ? getGroup({ id: groupId })
        : Promise.reject(new Error('No ID provided')),
    enabled: !!groupId,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div className="box-border h-full w-full px-4">
      <TeamHeader groupName={groupData?.name || '그룹 이름 없음'} />
      <MemberContainer members={groupData?.members || []} />
      <TodoList taskLists={groupData?.taskLists} groupId={groupId!} />
      <Report taskLists={groupData?.taskLists} groupId={groupId!} />
    </div>
  );
}
