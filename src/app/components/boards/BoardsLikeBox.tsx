'use client';

import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import instance from '@/app/lib/instance';
import postArticleLike from '@/app/lib/article/postArticleLike';
import deleteArticleLike from '@/app/lib/article/deleteArticleLike';
import BoardsLikeIcon from '@/app/components/icons/BoardsLikeIcon';

interface BoardsLikeBoxType {
  id: number;
  isLiked: boolean;
  likeCount: number;
}

export default function BoardsLikeBox({
  id,
  likeCount: initialLikeCount,
  isLiked: initialIsLiked,
}: BoardsLikeBoxType) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['article', id],
    queryFn: () => instance.get(`/articles/${id}`).then((res) => res.data),
    initialData: {
      isLiked: initialIsLiked,
      likeCount: initialLikeCount,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (currentIsLiked: boolean) =>
      currentIsLiked ? deleteArticleLike(id) : postArticleLike(id),
    onMutate: async (currentIsLiked) => {
      await queryClient.cancelQueries({ queryKey: ['article', id] });

      const previousData = queryClient.getQueryData(['article', id]);

      queryClient.setQueryData(
        ['article', id],
        (old: { isLiked: boolean; likeCount: number }) => ({
          ...old,
          isLiked: !currentIsLiked,
          likeCount: currentIsLiked ? old.likeCount - 1 : old.likeCount + 1,
        }),
      );

      return { previousData };
    },
    onError: (err, currentIsLiked, context) => {
      queryClient.setQueryData(['article', id], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article', id] });
    },
  });

  const handleLike = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      await mutateAsync(data?.isLiked ?? false);
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  return (
    <>
      <div
        onClick={handleLike}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLike(e);
          }
        }}
      >
        <BoardsLikeIcon isLiked={data?.isLiked ?? false} />
      </div>
      <span className="text-xs text-text-disabled tablet:text-md">
        {data?.likeCount ?? 0}
      </span>
    </>
  );
}
