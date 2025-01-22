import { PatchTaskOrderRequest, PatchTaskRequest } from '@/app/types/task';
import instance from '../instance';

// 할 일 수정
export const editTask = async ({
  groupId,
  taskListId,
  taskId,
  name,
  description,
  done,
}: PatchTaskRequest) => {
  const res = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    { name, description, done },
  );

  return res.data;
};

// 할 일 순서 수정
export const editTaskOrder = async ({
  groupId,
  taskListId,
  id,
  displayIndex,
}: PatchTaskOrderRequest) => {
  const res = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${id}/order`,
    { displayIndex },
  );

  return res.data;
};
