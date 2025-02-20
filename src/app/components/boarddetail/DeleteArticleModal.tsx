'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import deleteArticle from '@/app/lib/article/deleteArticle';
import ConfirmModal from '@/app/components/common/modal/ConfirmModal';
import useToast from '@/app/hooks/useToast';

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
  const { showToast } = useToast();

  // 게시글 삭제 API
  const deleteMutation = useMutation({
    mutationFn: () => deleteArticle({ articleId }),
    onSuccess: () => {
      showToast({ message: '게시글 삭제 완료!😊', type: 'success' });
      onClose();
      router.push('/boards'); // 삭제 후 게시판 목록으로 이동
    },
  });

  return (
    <ConfirmModal
      title={
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-lg font-light">게시글을 삭제하시겠어요?</h2>
          <p className="mb-4 text-center text-md font-thin">
            삭제된 게시글은 복구할 수 없습니다.
          </p>
        </div>
      }
      cancelLabel="닫기"
      confirmLabel="삭제하기"
      isModalOpen={isOpen}
      handleCancel={onClose}
      handleConfirm={() => deleteMutation.mutate()}
    />
  );
}
