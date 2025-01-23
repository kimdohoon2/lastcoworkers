import instance from '../instance';

interface PostTaskListRequest {
  groupId: number;
  name: string;
}

interface PostTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

// 할 일 목록 생성
const createTaskList = async ({
  groupId,
  name,
}: PostTaskListRequest): Promise<PostTaskListResponse> => {
  const res = await instance.post<PostTaskListResponse>(
    `/groups/${groupId}/task-lists`,
    { name },
  );

  return res.data;
};

export default createTaskList;
