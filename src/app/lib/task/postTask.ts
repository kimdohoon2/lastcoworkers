import axios from 'axios';
import { PostTaskRequest } from '@/app/types/task';

// 할 일 생성
export const createTask = async ({
  groupId,
  taskListId,
  data,
}: PostTaskRequest) => {
  const res = await axios.post(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    data,
  );

  return res.data;
};

export default createTask;
