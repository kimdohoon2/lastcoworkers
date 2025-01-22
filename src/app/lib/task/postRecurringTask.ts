import { CreateRecurringTaskRequest } from '@/app/types/recurring';
import axios from 'axios';

// 반복 할 일 생성
export const createRecurringTask = async ({
  groupId,
  taskListId,
  data,
}: CreateRecurringTaskRequest) => {
  const res = await axios.post(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    data,
  );
  return res.data;
};

export default createRecurringTask;
