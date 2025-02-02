export interface GetArticleRequest {
  page: number;
  pageSize: number;
  orderBy?: string;
  keyword?: string;
}

export interface GetArticleResponse {
  totalCount: number;
  list: Article[];
}

export interface Article {
  updatedAt: string;
  createdAt?: string;
  likeCount: number;
  writer: ArticleWriter;
  image?: string;
  title: string;
  id: number;
}

export interface ArticleWriter {
  nickname: string;
  id: number;
}
