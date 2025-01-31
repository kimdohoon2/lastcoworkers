import instance from '../instance';

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

export default async function postArticle(): Promise<PostArticleResponse> {
  const { data } = await instance.post<PostArticleResponse>('/articles');
  return data;
}
