import { Task } from '@/app/types/task';
import instance from '../instance';

interface GetTasksRequest {
  groupId: number;
  taskListId: number;
  date?: string;
}

interface GetTaskDetailRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
}

// 할 일 리스트 조회
export const getTasks = async ({
  groupId,
  taskListId,
  date,
}: GetTasksRequest): Promise<Task[]> => {
  const res = await instance.get<Task[]>(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    { params: { date } },
  );

  return res.data;
};

// 할 일 상세 조회
export const getTask = async ({
  groupId,
  taskListId,
  taskId,
}: GetTaskDetailRequest): Promise<Task> => {
  const res = await instance.get<Task>(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );

  return res.data;
};
