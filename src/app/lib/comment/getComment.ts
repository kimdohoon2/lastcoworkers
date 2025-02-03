import { useQuery } from '@tanstack/react-query';
import instance from '../instance';

interface GetTaskCommentRequest {
  taskId: number;
}

interface User {
  id: number;
  nickname: string;
  image: string | null;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

type GetTaskCommentResponse = Comment[];

// 할 일 댓글 조회
export const getTaskComment = async ({
  taskId,
}: GetTaskCommentRequest): Promise<GetTaskCommentResponse> => {
  const res = await instance.get<GetTaskCommentResponse>(
    `/tasks/${taskId}/comments`,
  );

  return res.data;
};

export const useTaskCommentQuery = (taskId: number) => {
  return useQuery({
    queryKey: ['tasks', taskId, 'comments'],
    queryFn: () => getTaskComment({ taskId }),
  });
};
