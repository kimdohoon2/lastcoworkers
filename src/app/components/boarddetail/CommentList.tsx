'use client';

import { useParams } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
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
import Image from 'next/image';

import AddComment from './AddComment';
import CommentDropdown from './CommentDropdown';
import Button from '../common/button/Button';
import IconMember from '../icons/IconMember';

export default function CommentList() {
  const params = useParams();
  const articleId = Number(params?.boardid);
  const queryClient = useQueryClient();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  // 현재 로그인한 사용자 ID 가져오기
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

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

  // 댓글 수정 취소 함수
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };

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

      <div className="mt-8 flex flex-col gap-4 tablet:mt-10">
        {data?.pages.map((page) =>
          page.list.map((comment) => {
            // 현재 로그인한 사용자가 해당 댓글의 작성자인지 확인
            const isCommentAuthor =
              Boolean(currentUserId) &&
              String(currentUserId) === String(comment.writer.id);

            return (
              <div
                key={comment.id}
                className="rounded-lg border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary p-4"
              >
                <div className="flex flex-col gap-8">
                  {editingCommentId === comment.id ? (
                    <div className="relative flex flex-col">
                      <input
                        type="text"
                        className="w-full bg-background-secondary pb-6 pt-0.5"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />

                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleEditCancel}
                          className="mr-2 text-md font-light text-text-default"
                        >
                          취소
                        </button>

                        <Button
                          variant="inverse"
                          size="small"
                          onClick={() => handleEditSubmit(comment.id)}
                          className="font-light"
                        >
                          수정 완료
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{comment.content}</span>
                      {isCommentAuthor && (
                        <CommentDropdown
                          commentId={comment.id}
                          onEdit={() => handleEdit(comment.id, comment.content)}
                          onDelete={handleDelete}
                        />
                      )}
                    </div>
                  )}

                  {editingCommentId !== comment.id && (
                    <div className="flex items-center gap-2">
                      {comment.writer.image ? (
                        <Image
                          width={32}
                          height={32}
                          src={comment.writer.image}
                          alt="Profile"
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <IconMember />
                      )}
                      <p className="text-primary ml-1 text-xs tablet:text-md">
                        {comment.writer.nickname}
                      </p>
                      <p className="border-l-[0.063rem] border-text-primary border-opacity-10 pl-2 text-xs text-text-disabled tablet:text-md">
                        {new Date(comment.createdAt)
                          .toLocaleDateString()
                          .replace(/\.$/, '')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          }),
        )}
      </div>

      {/* 무한 스크롤 감지 */}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
