import instance from '@/app/lib/instance';

export default async function deleteArticle(articleId: number) {
  const response = await instance.delete(`articles/${articleId}`);
  return response.data;
}
