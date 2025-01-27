import useModal from '@/app/hooks/useModal';
import AddMemberModal from './AddMemberModal';
import MemberCard from './MemberCard';
import { useQuery } from '@tanstack/react-query';
import getInvitation from '@/app/lib/group/getInvitaion';

interface GroupMember {
  role: 'ADMIN' | 'MEMBER';
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

function MemberContainer({ members }: { members: GroupMember[] }) {
  const { isOpen, openModal, closeModal } = useModal();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['invitationToken'],
    queryFn: () => getInvitation(members[0].groupId),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return null;

  return (
    <div className="mx-auto mt-12 max-w-[75rem]">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-lg font-medium">
          멤버
          <span className="ml-2 font-normal text-text-default">{`(${members.length}명)`}</span>
        </div>
        <button
          type="button"
          className="text-md text-brand-primary"
          onClick={openModal}
        >
          + 새로운 멤버 초대하기
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 tablet:grid-cols-3 tablet:gap-6">
        {members.map((member) => (
          <MemberCard key={member.userId} member={member} />
        ))}
      </div>
      <AddMemberModal
        token={data?.token || ''}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
}

export default MemberContainer;
