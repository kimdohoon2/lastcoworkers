import instance from '../instance';

interface PatchTaskListRequest {
  groupId: number;
  id: number;
  name: string;
}

interface PatchTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

interface PatchTaskListOrderRequest {
  groupId: number;
  id: number;
  displayIndex: number;
}

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
export const editTaskListOrder = async ({
  groupId,
  id,
  displayIndex,
}: PatchTaskListOrderRequest) => {
  const res = await instance.patch(`groups/${groupId}/task-lists/${id}/order`, {
    displayIndex,
  });

  return res.data;
};
