import { Task } from '@/app/types/task';
import instance from '../instance';

interface GetTaskListRequest {
  groupId: number;
  id: number;
  date: string;
}

interface GetTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

// 할 일 목록 조회
const getTaskList = async ({
  groupId,
  id,
  date,
}: GetTaskListRequest): Promise<GetTaskListResponse> => {
  const res = await instance.get<GetTaskListResponse>(
    `/groups/${groupId}/task-lists/${id}`,
    {
      params: { date },
    },
  );

  return res.data;
};

export default getTaskList;
