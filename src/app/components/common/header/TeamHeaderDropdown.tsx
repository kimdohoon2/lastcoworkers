'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import useDropdown from '@/app/hooks/useDropdown';
import IconHeaderCheck from '@/app/components/icons/IconHeaderCheck';
import Image from 'next/image';
import IconPlus from '@/app/components/icons/IconPlus';
import clsx from 'clsx';
import IconDefaultImage from '@/app/components/icons/IconDefaultImage';
import { GetUserResponse, Membership } from '@/app/lib/user/getUser';

interface TeamHeaderDropdownProps {
  userData: GetUserResponse;
}

export default function TeamHeaderDropdown({
  userData,
}: TeamHeaderDropdownProps) {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const router = useRouter();
  const params = useParams();

  const currentGroupId = params.teamid ? Number(params.teamid) : null;

  let displayGroupName = userData.memberships[0]?.group.name || '팀 생성하기';
  let displayGroupImage = userData.memberships[0]?.group.image || null;

  if (currentGroupId) {
    const membership = userData.memberships.find(
      (m: Membership) => m.group.id === currentGroupId,
    );
    if (membership) {
      displayGroupName = membership.group.name;
      displayGroupImage = membership.group.image;
    }
  }

  return (
    <Dropdown className="relative hidden tablet:block" onClose={closeDropdown}>
      <DropdownToggle className="flex" onClick={toggleDropdown}>
        <div className="flex w-[13.625rem] items-center gap-3 truncate px-4">
          <div className="relative h-8 w-8 flex-shrink-0">
            {displayGroupImage ? (
              <Image
                src={displayGroupImage}
                alt={displayGroupName}
                fill
                className="rounded-md"
              />
            ) : (
              <IconDefaultImage />
            )}
          </div>
          <span className="flex-1 truncate text-start">{displayGroupName}</span>
          <IconHeaderCheck
            className={clsx('flex-shrink-0 transition-transform', {
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
        <div className="custom-scrollbar max-h-[18rem] overflow-y-scroll">
          {userData?.memberships.map((membership: Membership) => (
            <DropdownItem
              key={membership.group.id}
              onClick={() => {
                router.push(`/${membership.group.id}`);
                closeDropdown();
              }}
              className="hover:bg-transparent"
            >
              <div className="flex h-12 w-full items-center gap-3 rounded-xl px-2 hover:bg-background-tertiary">
                <div className="relative h-8 w-8 flex-shrink-0">
                  {membership.group.image ? (
                    <Image
                      src={membership.group.image}
                      alt={membership.group.name}
                      fill
                      className="rounded-md"
                    />
                  ) : (
                    <IconDefaultImage />
                  )}
                </div>
                <div className="truncate">{membership.group.name}</div>
              </div>
            </DropdownItem>
          ))}
        </div>
        <DropdownItem
          onClick={() => {
            router.push('/addteam');
            closeDropdown();
          }}
          className="hover:bg-transparent"
        >
          <div className="flex h-12 w-full items-center justify-center gap-1 rounded-xl border border-slate-50 hover:bg-background-tertiary">
            <IconPlus />
            <span className="text-lg font-medium">팀 추가하기</span>
          </div>
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
}
