import Image from 'next/image';
import IconProfileEmpty from '@/app/components/icons/IconProfileEmpty';
import TaskCardDropdown from '@/app/components/icons/TaskCardDropdown';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import useDropdown from '@/app/hooks/useDropdown';
import useModal from '@/app/hooks/useModal';
import DetailMemberModal from '@/app/components/team/DetailMemberModal';
import deleteMember from '@/app/lib/group/deleteMemeber';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmModal from '@/app/components/common/modal/ConfirmModal';

interface GroupMember {
  role: 'ADMIN' | 'MEMBER';
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

function MemberCard({ member }: { member: GroupMember }) {
  const queryClient = useQueryClient();
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isConfirmModalOpen,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();

  const { mutate: expelMember } = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', member.groupId] });
    },
    onError: () => {
      alert('멤버 추방을 실패했습니다.');
    },
  });

  const handleExpel = async () => {
    expelMember({ groupId: member.groupId, userId: member.userId });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-1.5 rounded-2xl bg-background-secondary px-4 py-3 tablet:px-6 tablet:py-5">
        <div>
          <div className="mb-1.5 flex items-center gap-2 tablet:relative tablet:mb-0.5 tablet:block tablet:pl-11">
            <div className="relative h-6 w-6 tablet:absolute tablet:inset-0 tablet:h-8 tablet:w-8">
              {member.userImage ? (
                <Image src={member.userImage} fill alt="프로필 이미지" />
              ) : (
                <IconProfileEmpty className="h-full w-full" />
              )}
            </div>
            <div className="text-md font-medium">{member.userName}</div>
          </div>
          <div className="text-xs text-text-secondary tablet:ml-11">
            {member.userEmail}
          </div>
        </div>
        <Dropdown onClose={closeDropdown}>
          <DropdownToggle className="h-4 w-4" onClick={toggleDropdown}>
            <TaskCardDropdown />
          </DropdownToggle>

          <DropdownList className="right-0" isOpen={isOpen}>
            <DropdownItem onClick={openModal} onClose={closeDropdown}>
              멤버 정보
            </DropdownItem>
            <DropdownItem onClick={openConfirmModal} onClose={closeDropdown}>
              추방하기
            </DropdownItem>
          </DropdownList>
        </Dropdown>
      </div>
      <DetailMemberModal
        member={member}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      <ConfirmModal
        isModalOpen={isConfirmModalOpen}
        title={`${member.userName}님을 추방하시겠어요?`}
        cancelLabel="취소"
        confirmLabel="추방"
        handleCancel={closeConfirmModal}
        handleConfirm={handleExpel}
      />
    </>
  );
}

export default MemberCard;
