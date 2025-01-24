'use client';

import { useQuery } from '@tanstack/react-query';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconGear from '@/app/components/icons/IconGear';
import TeamThumbnail from '@/app/components/icons/TeamThumbnail';
import useDropdown from '@/app/hooks/useDropdown';
import clsx from 'clsx';
import getGroup from '@/app/lib/group/getGroup';
import { usePathname, useSearchParams } from 'next/navigation'; // Next.js 13 라우팅 시스템

export default function TeamPage() {
  const { isOpen, toggleDropdown, closeDropdown, selectItem } = useDropdown();

  // URL에서 teamId 가져오기
  const pathname = usePathname();

  // teamId 추출 (동적 라우트에서 추출)
  const teamId = pathname?.split('/').filter(Boolean).pop();
  const id = teamId ? Number(teamId) : undefined;

  // React Query를 이용한 데이터 가져오기
  const {
    data: groupData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['group', id],
    queryFn: () => (id ? getGroup({ id }) : Promise.reject('No ID provided')),
    enabled: !!id, // id가 존재할 때만 쿼리 실행
    staleTime: 5 * 60 * 1000,
  });

  const handleItemClick = (item: string) => {
    selectItem(item);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div className="box-border h-full w-full px-4">
      <div className="border-state-50/10 relative mx-auto mt-[5.25rem] flex h-16 w-full max-w-[75rem] items-center justify-between rounded-xl border bg-background-secondary px-6">
        <span className="z-10 text-xl font-bold">
          {groupData?.name || '그룹 이름 없음'}
        </span>
        <div className="absolute right-[5.625rem] z-0">
          <TeamThumbnail />
        </div>
        <Dropdown
          className="relative flex items-center"
          onClose={closeDropdown}
        >
          <DropdownToggle onClick={toggleDropdown}>
            <IconGear
              className={clsx('transition-transform', {
                'rotate-180': isOpen,
                'rotate-0': !isOpen,
              })}
            />
          </DropdownToggle>

          <DropdownList className="absolute right-4 top-6 w-28" isOpen={isOpen}>
            <DropdownItem
              className="text-center"
              onClick={() => handleItemClick('수정하기')}
              onClose={closeDropdown}
            >
              수정하기
            </DropdownItem>
            <DropdownItem
              className="text-center"
              onClick={() => handleItemClick('삭제하기')}
              onClose={closeDropdown}
            >
              삭제하기
            </DropdownItem>
          </DropdownList>
        </Dropdown>
      </div>
    </div>
  );
}
