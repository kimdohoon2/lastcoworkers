import { useMutation } from '@tanstack/react-query';
import instance from '../instance';

interface DeleteTaskCommentRequest {
  taskId: number;
  commentId: number;
}

// 할 일 댓글 삭제
export const deleteTaskComment = async ({
  taskId,
  commentId,
}: DeleteTaskCommentRequest) => {
  const res = await instance.delete(`/tasks/${taskId}/comments/${commentId}`);
  return res.data;
};

export const useDeleteTaskCommentMutation = () => {
  return useMutation({
    mutationFn: deleteTaskComment,
  });
};
