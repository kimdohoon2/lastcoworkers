import {
  UpdateTaskListRequest,
  UpdateTaskListResponse,
  UpdateTaskListOrderRequest,
} from '@/app/types/taskList';
import instance from '../instance';

// 할 일 목록 이름 변경
export const updateTaskList = async ({
  groupId,
  id,
  name,
}: UpdateTaskListRequest): Promise<UpdateTaskListResponse> => {
  const res = await instance.patch(`groups/${groupId}/task-lists/${id}`, {
    name,
  });
  return res.data;
};

// 할 일 목록 순서 변경
export const updateTaskOrder = async ({
  groupId,
  id,
  displayIndex,
}: UpdateTaskListOrderRequest) => {
  const res = await instance.patch(`groups/${groupId}/task-lists/${id}/order`, {
    displayIndex,
  });
  return res.data;
};
