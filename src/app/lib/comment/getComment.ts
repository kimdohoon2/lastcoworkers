import { useQuery } from '@tanstack/react-query';
import instance from '../instance';

interface GetTaskCommentRequest {
  taskId: number;
}

// 할 일 댓글 조회
export const getTaskComment = async ({ taskId }: GetTaskCommentRequest) => {
  const res = await instance.get(`/tasks/${taskId}/comments`);

  return res.data;
};

export const useTaskCommentQuery = (taskId: number) => {
  return useQuery({
    queryKey: ['tasks', taskId, 'comments'],
    queryFn: () => getTaskComment({ taskId }),
  });
};
