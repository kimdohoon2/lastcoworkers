import instance from '../instance';

export interface DeleteArticleComment {
  commentId: number;
}

export default async function deleteArticleComment({
  commentId,
}: DeleteArticleComment) {
  const { data } = await instance.delete(`comments/${commentId}`);
  return data;
}
