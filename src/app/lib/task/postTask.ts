import { CreateTaskRequest } from '@/app/types/task';
import axios from 'axios';

// 할 일 생성
export const createTask = async ({
  groupId,
  taskListId,
  data,
}: CreateTaskRequest) => {
  const res = await axios.post(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    data,
  );
  return res.data;
};

export default createTask;
