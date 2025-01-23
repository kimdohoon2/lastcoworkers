import { RecurringTaskData } from '@/app/types/task';
import axios from 'axios';

interface PostTaskRequest {
  groupId: number;
  taskListId: number;
  data: RecurringTaskData;
}

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
