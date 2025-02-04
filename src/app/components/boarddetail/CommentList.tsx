'use client';

import { useParams } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import getArticleComment, {
  GetArticleCommentResponse,
} from '@/app/lib/articlecomment/getArticleComment';
import patchArticleComment, {
  PatchArticleCommentRequest,
  PatchArticleCommentResponse,
} from '@/app/lib/articlecomment/patchArticleComment';
import deleteArticleComment, {
  DeleteArticleComment,
} from '@/app/lib/articlecomment/deleteArticleComment';

import IconHeart from '../icons/IconHeart';
import AddComment from './AddComment';
import CommentDropdown from './CommentDropdown';
import Button from '../common/button/Button';

export default function CommentList() {
  const params = useParams();
  const articleId = Number(params?.boardId);
  const queryClient = useQueryClient();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  // 댓글 목록 불러오기 API
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

  // 댓글 수정 API
  const editCommentMutation = useMutation<
    PatchArticleCommentResponse,
    Error,
    PatchArticleCommentRequest
  >({
    mutationFn: (requestData: PatchArticleCommentRequest) =>
      patchArticleComment(requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articleComments', articleId],
      });
      setEditingCommentId(null);
    },
  });

  // 댓글 삭제 API
  const deleteCommentMutation = useMutation<void, Error, DeleteArticleComment>({
    mutationFn: (commentData) => deleteArticleComment(commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articleComments', articleId],
      });
    },
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
    deleteCommentMutation.mutate({ commentId });
  };

  // 댓글 수정
  const handleEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const handleEditSubmit = (commentId: number) => {
    editCommentMutation.mutate({ commentId, content: editedContent });
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
                  {editingCommentId === comment.id ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        className="w-full rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-tertiary px-2 py-2"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />

                      <Button
                        variant="inverse"
                        size="small"
                        onClick={() => handleEditSubmit(comment.id)}
                        className="text-xs font-light"
                      >
                        수정 완료
                      </Button>
                    </div>
                  ) : (
                    <span>{comment.content}</span>
                  )}

                  <CommentDropdown
                    commentId={comment.id}
                    onEdit={() => handleEdit(comment.id, comment.content)}
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
