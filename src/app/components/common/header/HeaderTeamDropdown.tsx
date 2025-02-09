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
import Image from 'next/image';
import IconPlus from '../../icons/IconPlus';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function HeaderTeamDropdown() {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const router = useRouter();

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
          <IconHeaderCheck
            className={clsx('transition-transform', {
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            })}
          />
        </div>
      </DropdownToggle>
      <DropdownList
        isOpen={isOpen}
        className="absolute right-0 mt-2 w-[13.625rem] rounded shadow-lg"
      >
        {userData?.memberships.map((membership: Membership) => (
          <DropdownItem
            key={membership.group.id}
            onClick={() => {
              router.push(`/${membership.groupId}`);
            }}
            onClose={closeDropdown}
            className="hover:bg-transparent"
          >
            <div className="flex h-12 w-[11.625rem] items-center gap-3 rounded-xl px-2 hover:bg-background-tertiary">
              <div className="relative h-8 w-8">
                <Image
                  src={membership.group.image}
                  alt={membership.group.name}
                  fill
                  className="rounded-md"
                />
              </div>
              <div>{membership.group.name}</div>
            </div>
          </DropdownItem>
        ))}
        <DropdownItem
          onClick={() => {
            router.push('/addteam');
          }}
          onClose={closeDropdown}
          className="hover:bg-transparent"
        >
          <div className="flex h-12 w-[11.625rem] items-center justify-center gap-1 rounded-xl border border-slate-50 hover:bg-background-tertiary">
            <IconPlus />
            <span className="text-lg font-medium">팀 추가하기</span>
          </div>
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
