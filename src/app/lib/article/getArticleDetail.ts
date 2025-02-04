import instance from '../instance';

interface GetArticleDetailRequest {
  articleId: number;
}

export interface GetArticleDetailResponse {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
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

export default async function getArticleDetail({
  articleId,
}: GetArticleDetailRequest): Promise<GetArticleDetailResponse> {
  const { data } = await instance.get<GetArticleDetailResponse>(
    `/articles/${articleId}`,
  );
  return data;
}
