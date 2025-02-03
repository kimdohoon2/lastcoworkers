import instance from '@/app/lib/instance';
import { GetArticleRequest, GetArticleResponse } from '@/app/types/ArticleType';

export default async function getArticle(
  data: GetArticleRequest,
): Promise<GetArticleResponse> {
  const response = await instance.get<GetArticleResponse>('/articles', {
    params: data,
  });
  return response.data;
}
