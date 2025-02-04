import { useMutation } from '@tanstack/react-query';
import instance from '../instance';

interface PatchTaskCommentRequest {
  taskId: number;
  commentId: number;
  content: string;
}

// 할 일 댓글 수정
export const editTaskComment = async ({
  taskId,
  commentId,
  content,
}: PatchTaskCommentRequest) => {
  const res = await instance.patch(`/tasks/${taskId}/comments/${commentId}`, {
    content,
  });
  return res.data;
};

export const useEditTaskCommentMutation = () => {
  return useMutation({
    mutationFn: editTaskComment,
  });
};
