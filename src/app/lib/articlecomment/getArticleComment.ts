import instance from '../instance';

export interface GetArticleCommentRequest {
  articleId: number;
  limit: number;
  cursor?: number;
}

export interface GetArticleCommentResponse {
  nextCursor?: number;
  list: Comment[];
}

export interface Comment {
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

export default async function getArticleComment({
  articleId,
  limit,
  cursor,
}: GetArticleCommentRequest): Promise<GetArticleCommentResponse> {
  const { data } = await instance.get<GetArticleCommentResponse>(
    `/articles/${articleId}/comments`,
    {
      params: {
        limit,
        ...(cursor && { cursor }),
      },
    },
  );
  return data;
}
