'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import deleteArticle from '@/app/lib/article/deleteArticle';
import Modal from '@/app/components/common/modal/Modal';
import Button from '@/app/components/common/button/Button';
import IconAlert from '@/app/components/icons/IconAlert';

interface DeleteArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: number;
}

export default function DeleteArticleModal({
  isOpen,
  onClose,
  articleId,
}: DeleteArticleModalProps) {
  const router = useRouter();

  // 게시글 삭제 API
  const deleteMutation = useMutation({
    mutationFn: () => deleteArticle({ articleId }),
    onSuccess: () => {
      alert('게시글이 삭제되었습니다.');
      onClose();
      router.push('/boards'); // 삭제 후 게시판 목록으로 이동
    },
  });

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="flex flex-col items-center">
        <IconAlert />
        <div className="mt-4 flex w-[239px] flex-col items-center">
          <h2 className="mb-4 text-lg font-light">게시글을 삭제하시겠어요?</h2>
          <p className="mb-6 text-center text-md font-thin">
            삭제된 게시글은 복구할 수 없습니다.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={onClose} variant="secondary" className="w-[8.5rem]">
            닫기
          </Button>
          <Button
            onClick={() => deleteMutation.mutate()}
            variant="danger"
            className="w-[8.5rem]"
          >
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
