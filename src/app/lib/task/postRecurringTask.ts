import { RecurringTaskDataBody } from '@/app/types/task';
import { useMutation } from '@tanstack/react-query';

import instance from '../instance';

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
  const res = await instance.post(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    data,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    },
  );
  return res.data;
};

export const useCreateRecurringTaskMutation = () => {
  return useMutation({
    mutationFn: createRecurringTask,
  });
};

export default createRecurringTask;
