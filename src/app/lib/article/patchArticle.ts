import instance from '../instance';

export interface PatchArticleRequest {
  articleId: number;
  image: string | null;
  content: string;
  title: string;
}

export interface PatchArticleResponse {
  updatedAt: string;
  createdAt: string;
  likecount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  title: string;
  id: number;
  commentCount: number;
  isLiked: boolean;
  content: string;
}

export default async function patchArticle({
  articleId,
  image,
  content,
  title,
}: PatchArticleRequest): Promise<PatchArticleResponse> {
  const { data } = await instance.patch<PatchArticleResponse>(
    `articles/${articleId}`,
    { image, content, title },
  );
  return data;
}
