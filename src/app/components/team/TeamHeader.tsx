import TeamThumbnail from '@/app/components/icons/TeamThumbnail';
import HeaderDropdown from './HeaderDropdown';

interface HeaderProps {
  groupName: string;
}

export default function TeamHeader({ groupName }: HeaderProps) {
  return (
    <div className="relative mx-auto mt-[5.25rem] flex h-16 w-full max-w-[75rem] items-center justify-between rounded-xl border border-state-50/10 bg-background-secondary px-6">
      <span className="z-10 mr-2 truncate text-xl font-bold">
        {groupName || '그룹 이름 없음'}
      </span>
      <div className="absolute right-[5.625rem] z-0">
        <TeamThumbnail />
      </div>
      <HeaderDropdown groupName={groupName} />
    </div>
  );
}
