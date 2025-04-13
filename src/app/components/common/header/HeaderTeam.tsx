'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getUser, { GetUserResponse } from '@/app/lib/user/getUser';
import TeamHeaderDropdown from './TeamHeaderDropdown';
import TeamSidebar from './TeamSidebar';

interface HeaderTeamProps {
  type: 'sidebar' | 'header';
  onClick?: () => void;
}

export default function HeaderTeam({ type, onClick }: HeaderTeamProps) {
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
    return <div className="hidden tablet:block">로딩 중...</div>;
  }

  if (error) {
    return <div>유저 데이터를 불러오는데 실패했습니다.</div>;
  }

  if (!userData || userData.memberships?.length === 0) {
    return (
      <button className="inline-block rounded text-white hover:text-interaction-hover">
        팀 생성하기
      </button>
    );
  }

  if (type === 'header') {
    return <TeamHeaderDropdown userData={userData} />;
  }

  if (type === 'sidebar') {
    return <TeamSidebar userData={userData} onClick={onClick} />;
  }

  return null;
}
