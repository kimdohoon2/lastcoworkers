import instance from '@/app/lib/instance';
import { ArticleLike } from '@/app/types/ArticleType';

// 게시글 좋아요 API
const postArticleLike = async (articleId: number): Promise<ArticleLike> => {
  const response = await instance.post<ArticleLike>(
    `articles/${articleId}/like`,
  );
  console.log('좋아요 성공', response.data);
  return response.data;
};

export default postArticleLike;
