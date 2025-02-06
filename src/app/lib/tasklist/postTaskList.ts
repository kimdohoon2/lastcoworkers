import { useMutation } from '@tanstack/react-query';
import instance from '../instance';

interface PostTaskListRequest {
  groupId: number;
  name: string;
}

interface PostTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

// 할 일 목록 생성
export const createTaskList = async ({
  groupId,
  name,
}: PostTaskListRequest): Promise<PostTaskListResponse> => {
  const res = await instance.post<PostTaskListResponse>(
    `/groups/${groupId}/task-lists`,
    { name },
  );

  return res.data;
};

export const useCreateTaskListMutation = () => {
  return useMutation({
    mutationFn: createTaskList,
  });
};

export type { PostTaskListRequest, PostTaskListResponse };
