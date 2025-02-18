import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTaskCommentMutation } from '@/app/lib/comment/postComment';
import CommentActive from '@/app/components/icons/CommentActive';
import CommentInactive from '@/app/components/icons/CommentInactive';
import useToast from '@/app/hooks/useToast';

interface TaskCommentInputProps {
  taskId: number;
}

function TaskCommentInput({ taskId }: TaskCommentInputProps) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const { mutate: createComment, isPending } = useCreateTaskCommentMutation();

  const handleSubmit = () => {
    if (!comment.trim() || isPending) return;

    createComment(
      { taskId, content: comment },
      {
        onSuccess: () => {
          setComment('');
          queryClient.invalidateQueries({
            queryKey: ['tasks', taskId, 'comments'],
          });
          showToast({ message: '댓글 생성 완료!😊', type: 'success' });
        },
        onError: () => {
          showToast({ message: '댓글 생성에 실패했어요.🙁', type: 'error' });
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="댓글을 달아주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border-b border-t border-border-primary/10 bg-background-secondary py-[0.8125rem] text-md outline-none"
        disabled={isPending}
      />
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2"
        disabled={!comment.trim() || isPending}
        onClick={handleSubmit}
      >
        {comment.trim() ? <CommentActive /> : <CommentInactive />}
      </button>
    </div>
  );
}

export default TaskCommentInput;
