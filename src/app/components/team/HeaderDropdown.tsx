'use client';

import clsx from 'clsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import useModal from '@/app/hooks/useModal';
import useDropdown from '@/app/hooks/useDropdown';
import deleteGroup from '@/app/lib/group/deleteGroup';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import DropdownToggle from '@/app/components/common/dropdown/DropdownToggle';
import IconGear from '@/app/components/icons/IconGear';
import IconAlert from '@/app/components/icons/IconAlert';
import Modal from '@/app/components/common/modal/Modal';
import Button from '@/app/components/common/button/Button';

interface HeaderDropdownProps {
  groupName: string;
}

export default function HeaderDropdown({ groupName }: HeaderDropdownProps) {
  const router = useRouter();
  const { teamid } = useParams();
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const deleteModal = useModal();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteGroup({ groupId: Number(teamid) }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
      deleteModal.closeModal();
      router.push('/');
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <Dropdown className="relative flex items-center" onClose={closeDropdown}>
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
            onClick={() => router.push(`/${teamid}/edit`)}
            onClose={closeDropdown}
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            className="text-center text-red-500"
            onClick={deleteModal.openModal}
            onClose={closeDropdown}
          >
            삭제하기
          </DropdownItem>
        </DropdownList>
      </Dropdown>

      <Modal isOpen={deleteModal.isOpen} closeModal={deleteModal.closeModal}>
        <div className="flex flex-col items-center">
          <IconAlert />
          <div className="mt-4 flex w-[239px] flex-col items-center">
            <h2 className="mb-4 text-lg font-light">
              정말 그룹 삭제를 진행하시겠어요?
            </h2>
            <p className="mb-6 text-center text-lg font-bold text-red-500">
              [{groupName}] 그룹이 삭제됩니다!
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={deleteModal.closeModal}
              variant="secondary"
              className="w-[8.5rem]"
            >
              닫기
            </Button>
            <Button
              onClick={handleDelete}
              variant="danger"
              className="w-[8.5rem]"
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? '삭제 중...' : '삭제하기'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
