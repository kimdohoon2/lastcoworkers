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
import useToast from '@/app/hooks/useToast';

interface GroupMember {
  role: 'ADMIN' | 'MEMBER';
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

function MemberCard({
  member,
  isAdmin,
}: {
  member: GroupMember;
  isAdmin: boolean;
}) {
  const queryClient = useQueryClient();
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isConfirmModalOpen,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();
  const { showToast } = useToast();

  const { mutate: expelMember } = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      showToast({ message: '멤버 추방 완료!😊.', type: 'success' });
      queryClient.invalidateQueries({ queryKey: ['group', member.groupId] });
    },
    onError: () => {
      showToast({ message: '멤버 추방에 실패했어요.🙁', type: 'error' });
    },
  });

  const handleExpel = async () => {
    expelMember({ groupId: member.groupId, userId: member.userId });
  };

  return (
    <>
      <div className="flex w-full items-center justify-between gap-1.5 rounded-2xl bg-background-secondary px-4 py-3 tablet:px-6 tablet:py-5">
        <div className="w-full overflow-hidden">
          <div className="mb-1.5 flex items-center gap-2 tablet:relative tablet:mb-0.5 tablet:block tablet:pl-11">
            <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded-full tablet:absolute tablet:inset-0 tablet:h-8 tablet:w-8">
              {member.userImage ? (
                <Image src={member.userImage} fill alt="프로필 이미지" />
              ) : (
                <IconProfileEmpty className="h-full w-full" />
              )}
            </div>
            <div className="relative w-fit max-w-full overflow-hidden text-ellipsis whitespace-nowrap pr-5 text-md font-medium">
              {member.userName}
              {member.role === 'ADMIN' && (
                <span className="absolute right-0 top-0">
                  <Image
                    src="/icons/ic_star.webp"
                    width={17}
                    height={17}
                    alt="관리자 아이콘"
                  />
                </span>
              )}
            </div>
          </div>
          <div className="w-full overflow-hidden text-ellipsis text-xs text-text-secondary tablet:pl-11">
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
            {isAdmin && member.role !== 'ADMIN' && (
              <DropdownItem onClick={openConfirmModal} onClose={closeDropdown}>
                추방하기
              </DropdownItem>
            )}
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
