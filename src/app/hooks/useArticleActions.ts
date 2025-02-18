import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import useDropdown from '@/app/hooks/useDropdown';
import useModal from '@/app/hooks/useModal';
import useDeleteArticle from '@/app/hooks/useDeleteArticle';
import { Article } from '@/app/types/ArticleType';
import useToast from '@/app/hooks/useToast';

export default function useArticleActions(article: Article) {
  const { id, writer } = article;
  const router = useRouter();
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const deleteArticleMutation = useDeleteArticle();
  const { showToast } = useToast();

  // 현재 로그인한 사용자가 게시글 작성자인지 확인
  const isAuthor =
    Boolean(currentUserId) && String(currentUserId) === String(writer.id);

  const handleEditClick = () => {
    router.push(`/boards/${id}/editboard`);
  };

  const handleDropdownToggle = (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    toggleDropdown(e);
  };

  const handleDelete = () => {
    openDeleteModal();
    closeDropdown();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    action: (event: React.KeyboardEvent<HTMLDivElement>) => void,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action(e);
    }
  };

  const confirmDelete = () => {
    deleteArticleMutation.mutate(
      { articleId: id },
      {
        onSuccess: () => {
          showToast({ message: '게시글 삭제 완료!😊', type: 'success' });
          closeDeleteModal();
        },
        onError: () => {
          closeDeleteModal();
          showToast({
            message: '게시글 삭제에 실패했어요.🙁',
            type: 'error',
          });
        },
      },
    );
  };

  return {
    isOpen,
    closeDropdown,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    handleEditClick,
    handleDelete,
    confirmDelete,
    handleKeyDown,
    handleDropdownToggle,
    isAuthor,
  };
}
