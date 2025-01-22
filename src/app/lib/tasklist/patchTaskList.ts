import {
  PatchTaskListRequest,
  PatchTaskListResponse,
} from '@/app/types/taskList';
import { PatchTaskOrderRequest } from '@/app/types/task';
import instance from '../instance';

// 할 일 목록 이름 변경
export const editTaskList = async ({
  groupId,
  id,
  name,
}: PatchTaskListRequest): Promise<PatchTaskListResponse> => {
  const res = await instance.patch(`groups/${groupId}/task-lists/${id}`, {
    name,
  });

  return res.data;
};

// 할 일 목록 순서 변경
export const editTaskOrder = async ({
  groupId,
  id,
  displayIndex,
}: PatchTaskOrderRequest) => {
  const res = await instance.patch(`groups/${groupId}/task-lists/${id}/order`, {
    displayIndex,
  });

  return res.data;
};
