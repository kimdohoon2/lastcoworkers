'use client';

import { useParams } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getArticleComment, {
  GetArticleCommentResponse,
} from '@/app/lib/articlecomment/getArticleComment';

import IconHeart from '../icons/IconHeart';
import AddComment from './AddComment';
import CommentDropdown from './CommentDropdown';

export default function CommentList() {
  const params = useParams();
  const articleId = Number(params?.boardId);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 댓글 목록 불러오기 api
  const { data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<GetArticleCommentResponse>({
      queryKey: ['articleComments', articleId],
      queryFn: ({ pageParam = undefined }) =>
        getArticleComment({
          articleId,
          limit: 10,
          cursor: pageParam as number | undefined,
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: undefined,
      enabled: !Number.isNaN(articleId),
    });

  // 무한 스크롤
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loadMoreRef.current);
  }, [fetchNextPage, hasNextPage]);

  // 댓글 삭제
  const handleDelete = (commentId: number) => {
    console.log(`댓글 ${commentId} 삭제`);
  };

  // 댓글 수정
  const handleEdit = (commentId: number) => {
    console.log(`댓글 ${commentId} 수정`);
  };

  return (
    <div>
      <AddComment />

      {/* 댓글 리스트 */}
      <div className="mt-[32px] flex flex-col gap-[16px]">
        {data?.pages.map((page) =>
          page.list.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary p-4"
            >
              <div className="flex flex-col gap-[32px]">
                <div className="text-primary flex items-center justify-between text-md">
                  {comment.content}

                  <CommentDropdown
                    commentId={comment.id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
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
          )),
        )}
      </div>

      {/* 무한 스크롤 감지 */}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
