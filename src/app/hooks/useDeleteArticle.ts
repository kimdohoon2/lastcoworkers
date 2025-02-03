import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteArticle from '@/app/lib/article/deleteArticle';

const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });

      alert('게시글이 성공적으로 삭제되었습니다.');
      window.location.reload();
    },
    onError: () => {
      alert('본인이 작성한 게시글만 삭제할 수 있습니다.');
    },
  });
};

export default useDeleteArticle;
