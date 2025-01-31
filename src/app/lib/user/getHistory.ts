import instance from '../instance';

type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

export interface Task {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: FrequencyType;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
}

export interface GetHistoryResponse {
  tasksDone: Task[];
}

export default async function getHistory(): Promise<GetHistoryResponse> {
  const { data } = await instance.get<GetHistoryResponse>(`/user/history`);
  return data;
}
