import TeamThumbnail from '@/app/components/icons/TeamThumbnail';
import DropdownMenu from '@/app/components/team/DropdownMenu';

interface HeaderProps {
  groupName: string;
}

export default function Header({ groupName }: HeaderProps) {
  return (
    <div className="border-state-50/10 relative mx-auto mt-[5.25rem] flex h-16 w-full max-w-[75rem] items-center justify-between rounded-xl border bg-background-secondary px-6">
      <span className="z-10 text-xl font-bold">
        {groupName || '그룹 이름 없음'}
      </span>
      <div className="absolute right-[5.625rem] z-0">
        <TeamThumbnail />
      </div>
      <DropdownMenu />
    </div>
  );
}
