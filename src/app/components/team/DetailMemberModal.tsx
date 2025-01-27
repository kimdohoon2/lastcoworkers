import Image from 'next/image';
import Modal from '@/app/components/common/modal/Modal';
import IconProfileEmpty from '@/app/components/icons/IconProfileEmpty';
import Button from '@/app/components/common/button/Button';

interface DetailMemberProps {
  member: {
    userImage: string | null;
    userName: string;
    userEmail: string;
  };
  isOpen: boolean;
  closeModal: () => void;
}

function DetailMemberModal({ member, isOpen, closeModal }: DetailMemberProps) {
  const handleClick = async () => {
    await navigator.clipboard.writeText(member.userEmail);
    closeModal();
  };

  return (
    <Modal hasCloseBtn isOpen={isOpen} closeModal={closeModal}>
      <div className="w-full px-12 text-center">
        <div className="relative mx-auto mb-6 h-[2.875rem] w-[2.875rem] tablet:h-[3.25rem] tablet:w-[3.25rem]">
          {member.userImage ? (
            <Image src={member.userImage} fill alt="프로필 이미지" />
          ) : (
            <IconProfileEmpty className="h-full w-full" />
          )}
        </div>
        <div className="mb-2 text-md font-medium">{member.userName}</div>
        <div className="mb-6 text-xs text-text-secondary">
          {member.userEmail}
        </div>
        <Button className="w-full text-text-inverse" onClick={handleClick}>
          이메일 복사하기
        </Button>
      </div>
    </Modal>
  );
}

export default DetailMemberModal;
