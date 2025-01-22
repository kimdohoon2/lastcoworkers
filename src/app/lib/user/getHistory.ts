import instance from '../instance';

interface InstanceError {
  message: string;
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

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
  try {
    const { data } = await instance.get<GetHistoryResponse>(`/user/history`);
    return data;
  } catch (error: unknown) {
    const err = error as InstanceError;
    if (err.response) {
      console.error('API 응답 에러:', err.response?.data);
    }
    throw new Error(
      err.response?.data?.message || '완료한 작업을 불러오는데 실패했습니다.',
    );
  }
}
