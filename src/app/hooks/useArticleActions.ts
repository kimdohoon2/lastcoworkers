import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import useDropdown from '@/app/hooks/useDropdown';
import useModal from '@/app/hooks/useModal';
import useDeleteArticle from '@/app/hooks/useDeleteArticle';
import { Article } from '@/app/types/ArticleType';

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
    if (String(writer.id) !== String(currentUserId)) {
      alert('본인이 작성한 게시글만 삭제할 수 있습니다.');
      closeDropdown();
      return;
    }

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
          closeDeleteModal();
        },
        onError: (error) => {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 403) {
            closeDeleteModal();
            alert('본인이 작성한 게시글만 삭제할 수 있습니다.');
          }
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
  };
}
