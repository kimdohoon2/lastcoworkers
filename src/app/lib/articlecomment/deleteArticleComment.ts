import instance from '../instance';

export interface DeleteArticleComment {
  commentId: number;
}

export default async function deleteArticleComment({
  commentId,
}: DeleteArticleComment): Promise<void> {
  await instance.delete(`comments/${commentId}`);
}
