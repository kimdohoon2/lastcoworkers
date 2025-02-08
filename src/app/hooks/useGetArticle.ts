import { useQuery, UseQueryResult } from '@tanstack/react-query';
import getArticle from '@/app/lib/article/getArticle';
import { GetArticleRequest, GetArticleResponse } from '@/app/types/ArticleType';

export default function useGetArticle(
  params: GetArticleRequest,
): UseQueryResult<GetArticleResponse, Error> {
  return useQuery({
    queryKey: ['getArticle', params],
    queryFn: () => getArticle(params),
  });
}
