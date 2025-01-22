import { DeleteRecurringRequest, DeleteTaskRequest } from '@/app/types/task';
import axios from 'axios';

export const deleteTask = async ({
  groupId,
  taskListId,
  taskId,
}: DeleteTaskRequest) => {
  const res = await axios.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
  return res.data;
};

export const deleteRecurring = async ({
  groupId,
  taskListId,
  taskId,
  recurringId,
}: DeleteRecurringRequest) => {
  const res = await axios.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
  );

  return res.data;
};
