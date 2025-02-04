import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postArticleComment from '@/app/lib/articlecomment/postArticleComment';
import Button from '../common/button/Button';

export default function AddComment() {
  const params = useParams();
  const articleId = Number(params?.boardId);
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState('');

  // 댓글 등록 API 요청
  const mutation = useMutation({
    mutationFn: (content: string) => postArticleComment({ articleId, content }),
    onSuccess: () => {
      setCommentContent('');
      queryClient.invalidateQueries({
        queryKey: ['articleComments', articleId],
      });
    },
  });

  return (
    <div className="flex flex-col gap-[16px] border-b-[0.063rem] border-text-primary border-opacity-10 pb-[32px]">
      <div>댓글 달기</div>
      <textarea
        placeholder="내용을 입력해주세요."
        className="h-[104px] w-full resize-none rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button
        variant="primary"
        size="small"
        onClick={() => mutation.mutate(commentContent)}
        disabled={!commentContent.trim() || mutation.isPending}
      >
        등록
      </Button>
    </div>
  );
}
