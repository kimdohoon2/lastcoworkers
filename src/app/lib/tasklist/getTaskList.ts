import { GetTaskListRequest, GetTaskListResponse } from '@/app/types/taskList';
import instance from '../instance';

// 할 일 목록 조회
const getTaskList = async ({
  groupId,
  id,
  date,
}: GetTaskListRequest): Promise<GetTaskListResponse> => {
  const res = await instance.get(`/groups/${groupId}/task-lists/${id}`, {
    params: { date },
  });
  return res.data;
};

export default getTaskList;
