import instance from '../instance';

export interface PatchArticleCommentRequest {
  commentId: number;
  content: string;
}

export interface PatchArticleCommentResponse {
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

export default async function patchArticleComment({
  commentId,
  content,
}: PatchArticleCommentRequest): Promise<PatchArticleCommentResponse> {
  const { data } = await instance.patch<PatchArticleCommentResponse>(
    `comments/${commentId}`,
    { content },
  );
  return data;
}
