import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteArticle from '@/app/lib/article/deleteArticle';
import { Article } from '../types/ArticleType';

const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onMutate: async (variables) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['articles'] });

      // 이전 상태 저장 (롤백용)
      const previousArticles = queryClient.getQueryData<Article[]>([
        'articles',
      ]);

      // 낙관적 업데이트
      queryClient.setQueryData<Article[]>(
        ['articles'],
        (old) =>
          old?.filter((article) => article.id !== variables.articleId) || [],
      );

      return { previousArticles };
    },
    onError: (err, variables, context) => {
      // 에러 발생 시 이전 상태 복구
      if (context?.previousArticles) {
        queryClient.setQueryData(['articles'], context.previousArticles);
      }
    },
    onSettled: () => {
      // 최종 데이터 재검증
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export default useDeleteArticle;
