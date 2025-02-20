import { useMutation } from '@tanstack/react-query';
import instance from '../instance';

interface PostTaskCommentRequest {
  taskId: number;
  content: string;
}

// 할 일 댓글 생성
export const createTaskComment = async ({
  taskId,
  content,
}: PostTaskCommentRequest) => {
  const res = await instance.post(`/tasks/${taskId}/comments`, { content });

  return res.data;
};

export const useCreateTaskCommentMutation = () => {
  return useMutation({
    mutationFn: createTaskComment,
  });
};
