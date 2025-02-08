import instance from '@/app/lib/instance';

export interface DeleteArticle {
  articleId: number;
}

export default async function deleteArticle({
  articleId,
}: DeleteArticle): Promise<void> {
  await instance.delete(`articles/${articleId}`);
}
