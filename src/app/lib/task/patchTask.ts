import { UpdateTaskOrderRequest, UpdateTaskRequest } from '@/app/types/task';
import instance from '../instance';

export const updateTask = async ({
  groupId,
  taskListId,
  taskId,
  name,
  description,
  done,
}: UpdateTaskRequest) => {
  const res = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    { name, description, done },
  );

  return res.data;
};

export const updateTaskOrder = async ({
  groupId,
  taskListId,
  id,
  displayIndex,
}: UpdateTaskOrderRequest) => {
  const res = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${id}/order`,
    { displayIndex },
  );

  return res.data;
};
