import instance from '../instance';

export interface PostArticleCommentRequest {
  articleId: number;
  content: string;
}

export interface PostArticleCommentResponse {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export default async function postArticleComment({
  articleId,
  content,
}: PostArticleCommentRequest): Promise<PostArticleCommentResponse> {
  const { data } = await instance.post<PostArticleCommentResponse>(
    `/articles/${articleId}/comments`,
    { content },
  );
  return data;
}
