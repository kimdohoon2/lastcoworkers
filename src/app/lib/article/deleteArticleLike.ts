import instance from '@/app/lib/instance';
import { ArticleLike } from '@/app/types/ArticleType';

// 게시글 삭제 API
const deleteArticleLike = async (articleId: number): Promise<ArticleLike> => {
  const response = await instance.delete<ArticleLike>(
    `articles/${articleId}/like`,
  );
  console.log('좋아요 삭제', response.data);
  return response.data;
};

export default deleteArticleLike;
