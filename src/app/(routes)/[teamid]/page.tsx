'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import getGroup from '@/app/lib/group/getGroup';
import TeamHeader from '@/app/components/team/TeamHeader';
import TodoList from '@/app/components/team/TodoList';
import Report from '@/app/components/team/Report';
import MemberContainer from '@/app/components/team/MemberContainer';
import useAuthRedirect from '@/app/hooks/useAuthRedirect';
import AuthCheckLoading from '@/app/components/common/auth/AuthCheckLoading';
import Loading from '@/app/components/common/loading/Loading';
import useRedirectIfNotFound from '@/app/hooks/useRedirectIfNotFound';

export default function TeamPage() {
  const { teamid } = useParams();
  const { isLoading: isAuthLoading } = useAuthRedirect();

  const pathname = usePathname();
  const teamId = pathname?.split('/').filter(Boolean).pop();
  const groupId = teamId ? Number(teamId) : undefined;

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
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const isNotFound =
    (error && error.message === 'not_found') || Number.isNaN(Number(teamid));

  const { isRedirecting } = useRedirectIfNotFound(isNotFound);

  if (isAuthLoading) return <AuthCheckLoading />;

  if (isLoading || isRedirecting) return <Loading />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="box-border h-full w-full px-4">
      <TeamHeader
        groupName={groupData?.name || '그룹 이름 없음'}
        groupId={groupId!}
      />
      <TodoList taskLists={groupData?.taskLists || []} groupId={groupId!} />
      <Report taskLists={groupData?.taskLists || []} />
      <MemberContainer members={groupData?.members || []} />
    </div>
  );
}
