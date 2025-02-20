import instance from '../instance';

export interface PostArticleRequest {
  title: string;
  content: string;
  image?: string;
}

export interface PostArticleResponse {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: ArticleWriter[];
  image: string;
  title: string;
  id: number;
}

export interface ArticleWriter {
  nickname: string;
  id: number;
}

export default async function postArticle(
  data: PostArticleRequest,
): Promise<PostArticleResponse> {
  const response = await instance.post<PostArticleResponse>('/articles', data);
  return response.data;
}
