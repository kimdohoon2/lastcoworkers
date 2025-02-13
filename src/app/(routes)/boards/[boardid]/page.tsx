'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getArticleDetail, {
  GetArticleDetailResponse,
} from '@/app/lib/article/getArticleDetail';

import CommentList from '@/app/components/boarddetail/CommentList';
import BoardDetail from '@/app/components/boarddetail/BoardDetail';
import BoardDetailSkeleton from '@/app/components/boarddetail/BoardDetailSkeleton';

export default function BoardDetailPage() {
  const params = useParams();
  const articleId = params?.boardid;

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
    return <BoardDetailSkeleton />;
  }

  if (isError || !article) {
    return <div className="pt-20 text-center">게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex justify-center py-[6.25rem]">
      <div className="w-[90%] max-w-[75rem]">
        <BoardDetail article={article} />
        <CommentList />
      </div>
    </div>
  );
}
