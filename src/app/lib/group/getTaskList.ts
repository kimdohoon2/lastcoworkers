import instance from '@/app/lib/instance';

export interface Task {
  doneBy: {
    user: {
      image: string;
      nickname: string;
      id: number;
    };
  };
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number | null;
  frequency: string;
  updatedAt: string;
  doneAt: string | null;
  date: string;
  description: string;
  name: string;
  id: number;
}

export interface GetTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

// 할 일 목록 조회 API
const getTaskList = async ({
  groupId,
  taskListId,
  date,
}: {
  groupId: number;
  taskListId: number;
  date: string;
}): Promise<GetTaskListResponse> => {
  const response = await instance.get<GetTaskListResponse>(
    `/groups/${groupId}/task-lists/${taskListId}`,
    {
      params: { date },
    },
  );
  return response.data;
};

export default getTaskList;
