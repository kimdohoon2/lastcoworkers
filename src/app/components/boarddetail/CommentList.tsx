'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getArticleComment, {
  GetArticleCommentResponse,
} from '@/app/lib/articlecomment/getArticleComment';
import Button from '../common/button/Button';
import IconMore from '../icons/IconMore';
import IconHeart from '../icons/IconHeart';

export default function CommentList() {
  const params = useParams();
  const articleId = Number(params?.boardId);

  // 댓글 목록을 불러오는 API 요청
  const { data, isLoading, isError } = useQuery<GetArticleCommentResponse>({
    queryKey: ['articleComments', articleId],
    queryFn: () => getArticleComment({ articleId, limit: 10 }),
    enabled: !Number.isNaN(articleId),
  });

  if (isLoading) {
    return <div className="pt-20 text-center">댓글을 불러오는 중...</div>;
  }

  if (isError || !data || !data.list.length) {
    return <div className="pt-20 text-center">댓글이 없습니다.</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-[16px] border-b-[0.063rem] border-text-primary border-opacity-10 pb-[32px]">
        <div>댓글 달기</div>
        <textarea
          placeholder="내용을 입력해주세요."
          className="h-[104px] w-full resize-none rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400"
        />
        <Button variant="primary" size="small">
          등록
        </Button>
      </div>

      {/* 댓글 리스트 */}
      <div className="mt-[32px] flex flex-col gap-[16px]">
        {data.list.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary p-4"
          >
            <div className="flex flex-col gap-[32px]">
              <div className="text-primary flex items-center justify-between text-md">
                {comment.content}
                <IconMore />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <p className="text-primary">{comment.writer.nickname}</p>
                  <p className="border-l-[0.063rem] border-text-primary border-opacity-10 pl-[8px] text-sm text-text-disabled">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <IconHeart />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
