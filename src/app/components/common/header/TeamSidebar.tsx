'use client';

import React from 'react';
import Link from 'next/link';
import { GetUserResponse, Membership } from '@/app/lib/user/getUser';

interface TeamSidebarProps {
  userData: GetUserResponse;
  onClick?: () => void;
}

export default function TeamSidebar({ userData, onClick }: TeamSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      {userData?.memberships?.map((membership: Membership) => (
        <Link
          href={`/${membership.group.id}`}
          key={membership.group.id}
          onClick={onClick}
        >
          <span className="cursor-pointer text-md font-medium text-text-primary hover:text-interaction-hover">
            {membership.group.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
