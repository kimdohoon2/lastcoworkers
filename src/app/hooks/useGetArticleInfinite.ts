import { useInfiniteQuery } from '@tanstack/react-query';
import getArticle from '@/app/lib/article/getArticle';
import { GetArticleRequest, GetArticleResponse } from '@/app/types/ArticleType';

export default function useGetArticleInfinite(
  initialRequest: Omit<GetArticleRequest, 'page'>,
) {
  return useInfiniteQuery<GetArticleResponse>({
    queryKey: ['articles', initialRequest],
    queryFn: async ({ pageParam = 1 }) => {
      console.log(`${pageParam} 페이지 데이터 가져오는 중`);
      const response = await getArticle({
        ...initialRequest,
        page: pageParam as number,
      });
      console.log(`${pageParam} 페이지 데이터 수신:`, response);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const hasNextPage = lastPage.list.length === initialRequest.pageSize;
      if (!hasNextPage) {
        console.log(
          '모든 데이터를 불러왔습니다. API 호출을 더 이상 하지 않습니다.',
        );
      }
      return hasNextPage ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
}
