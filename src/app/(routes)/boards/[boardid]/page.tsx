'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getArticleDetail, {
  GetArticleDetailResponse,
} from '@/app/lib/article/getArticleDetail';

import CommentList from '@/app/components/boarddetail/CommentList';
import BoardDetail from '@/app/components/boarddetail/BoardDetail';
import useRedirectIfNotFound from '@/app/hooks/useRedirectIfNotFound';
import Loading from '@/app/components/common/loading/Loading';

export default function BoardDetailPage() {
  const params = useParams();
  const articleId = params?.boardid;

  const numericArticleId = Number(articleId);

  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useQuery<GetArticleDetailResponse>({
    queryKey: ['articleDetail', numericArticleId],
    queryFn: () => getArticleDetail({ articleId: numericArticleId }),
    enabled: !!articleId && !Number.isNaN(numericArticleId),
  });

  const isNotFound =
    error?.message === 'not_found' || Number.isNaN(numericArticleId);

  const { isRedirecting } = useRedirectIfNotFound(isNotFound);

  if (isLoading || isRedirecting) return <Loading />;

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
