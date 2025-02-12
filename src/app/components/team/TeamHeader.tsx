'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getUser, { GetUserResponse, Membership } from '@/app/lib/user/getUser';
import TeamThumbnail from '@/app/components/icons/TeamThumbnail';
import HeaderDropdown from './HeaderDropdown';
import TeamHeaderSkeleton from './TeamHeaderSkelton';

interface HeaderProps {
  groupName: string;
  groupId: number;
}

export default function TeamHeader({ groupName, groupId }: HeaderProps) {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div>
        <TeamHeaderSkeleton />
      </div>
    );
  }

  if (error || !userData) {
    return <div>유저 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const isAdmin = userData.memberships.some(
    (membership: Membership) =>
      membership.group.id === groupId && membership.role === 'ADMIN',
  );

  return (
    <div className="border-state-50/10 relative mx-auto mt-[5.25rem] flex h-16 w-full max-w-[75rem] items-center justify-between rounded-xl border bg-background-secondary px-6">
      <span className="z-10 mr-2 truncate text-xl font-bold">
        {groupName || '그룹 이름 없음'}
      </span>
      <div className="absolute right-[5.625rem] z-0">
        <TeamThumbnail />
      </div>
      {isAdmin && <HeaderDropdown groupName={groupName} />}
    </div>
  );
}
