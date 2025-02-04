'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getArticleDetail, {
  GetArticleDetailResponse,
} from '@/app/lib/article/getArticleDetail';
import IconMore from '@/app/components/icons/IconMore';
import IconComment from '@/app/components/icons/IconComment';
import IconHeart from '@/app/components/icons/IconHeart';
import CommentList from '@/app/components/boarddetail/CommentList';

export default function BoardDetail() {
  const params = useParams();
  const articleId = params?.boardId;

  const numericArticleId = Number(articleId);

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery<GetArticleDetailResponse>({
    queryKey: ['articleDetail', numericArticleId],
    queryFn: () => getArticleDetail({ articleId: numericArticleId }),
    enabled: !!articleId && !Number.isNaN(numericArticleId),
  });

  if (isLoading) {
    return <div className="pt-20 text-center">로딩 중...</div>;
  }

  if (isError || !article) {
    return <div className="pt-20 text-center">게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex justify-center py-[100px]">
      <div className="w-[90%] max-w-[75rem]">
        <div className="flex items-center justify-between border-b-[0.063rem] border-text-primary border-opacity-10">
          <h1 className="flex h-[64px] items-center text-lg text-text-secondary">
            {article.title}
          </h1>
          <IconMore />
        </div>
        <div className="flex h-[72px] items-center justify-between">
          <div className="flex items-center">
            <p className="mr-[8px] text-xs text-text-primary">
              {article.writer?.nickname || '알 수 없음'}
            </p>
            <p className="border-l-[0.063rem] border-text-primary border-opacity-10 pl-[8px] text-xs text-text-disabled">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-[8px]">
            <div className="flex items-center gap-[4px] text-xs text-text-disabled">
              <IconComment />
              {article.commentCount}
            </div>
            <span className="flex items-center gap-[4px] text-xs text-text-disabled">
              <IconHeart />
              {article.likeCount}
            </span>
          </div>
        </div>

        <div className="mb-[80px] mt-[24px] text-md leading-6 text-text-secondary">
          {article.content}
        </div>

        {/* 댓글영역 */}
        <CommentList />
      </div>
    </div>
  );
}
