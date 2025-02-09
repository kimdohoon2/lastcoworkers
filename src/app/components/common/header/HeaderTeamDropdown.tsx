'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getUser, { GetUserResponse, Membership } from '@/app/lib/user/getUser';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import useDropdown from '@/app/hooks/useDropdown';
import IconHeaderCheck from '../../icons/IconHeaderCheck';

export default function HeaderTeamDropdown() {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();

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
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>유저 데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <Dropdown className="relative inline-block" onClose={closeDropdown}>
      <DropdownToggle onClick={toggleDropdown}>
        <div className="flex items-center gap-3">
          {userData?.memberships[0].group.name || '내 팀'}
          <IconHeaderCheck />
        </div>
      </DropdownToggle>
      <DropdownList
        isOpen={isOpen}
        className="absolute right-0 mt-2 w-48 rounded shadow-lg"
      >
        {userData?.memberships.map((membership: Membership) => (
          <DropdownItem key={membership.group.id} onClick={closeDropdown}>
            {membership.group.name}
          </DropdownItem>
        ))}
      </DropdownList>
    </Dropdown>
  );
}
