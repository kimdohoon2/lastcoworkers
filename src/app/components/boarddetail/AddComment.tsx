import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postArticleComment from '@/app/lib/articlecomment/postArticleComment';
import Button from '../common/button/Button';

export default function AddComment() {
  const params = useParams();
  const articleId = Number(params?.boardid);
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
    <div className="flex flex-col gap-4 border-b-[0.063rem] border-text-primary border-opacity-10 pb-8 tablet:gap-6 tablet:pb-10">
      <div className="tablet:text-xl">댓글 달기</div>
      <textarea
        placeholder="내용을 입력해주세요."
        className="h-[6.5rem] w-full resize-none rounded-xl border-[0.063rem] border-text-primary border-opacity-10 bg-background-secondary py-4 pl-4 placeholder:text-md placeholder:font-light placeholder:text-gray-400 placeholder:tablet:text-lg"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="small"
          onClick={() => mutation.mutate(commentContent)}
          className="tablet:h-12 tablet:w-[11.5rem]"
          disabled={!commentContent.trim() || mutation.isPending}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
