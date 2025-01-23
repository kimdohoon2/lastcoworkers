import { RecurringTaskDataBody } from '@/app/types/task';
import axios from 'axios';

export interface PostRecurringTaskRequest {
  groupId: number;
  taskListId: number;
  data: RecurringTaskDataBody;
}

// 반복 할 일 생성
export const createRecurringTask = async ({
  groupId,
  taskListId,
  data,
}: PostRecurringTaskRequest) => {
  const res = await axios.post(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    data,
  );
  return res.data;
};

export default createRecurringTask;
