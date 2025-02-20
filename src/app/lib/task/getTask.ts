import { Task } from '@/app/types/task';
import { useQuery } from '@tanstack/react-query';
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
    {
      params: { date },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    },
  );

  return res.data;
};

export const useTasksQuery = (
  groupId: number,
  taskListId: number,
  date: string,
) => {
  return useQuery({
    queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks', date],
    queryFn: () => getTasks({ groupId, taskListId, date }),
  });
};

// 할 일 상세 조회
export const getTask = async ({
  groupId,
  taskListId,
  taskId,
}: GetTaskDetailRequest): Promise<Task> => {
  const res = await instance.get<Task>(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    },
  );

  return res.data;
};

export const useTaskQuery = (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  return useQuery({
    queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks', taskId],
    queryFn: () => getTask({ groupId, taskListId, taskId }),
  });
};
