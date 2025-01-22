import {
  CreateTaskListRequest,
  CreateTaskListResponse,
} from '@/app/types/taskList';
import instance from '../instance';

// 할 일 목록 생성
const createTaskList = async ({
  groupId,
  name,
}: CreateTaskListRequest): Promise<CreateTaskListResponse> => {
  const res = await instance.post(`/groups/${groupId}/task-lists`, { name });
  return res.data;
};

export default createTaskList;
