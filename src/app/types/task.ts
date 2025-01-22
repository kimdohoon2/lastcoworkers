enum FrequencyType {
  DAILY,
  WEEKLY,
  MONTHLY,
  ONCE,
}

export interface Task extends BaseTask, TaskAdditionalInfo {}

export interface BaseTask {
  id: number;
  name: string;
  description: string;
  frequency: FrequencyType;
  date: string;
  doneAt: string;
  updatedAt: string;
  deletedAt: string;
  displayIndex: number;
  commentCount: number;
  recurringId: number;
}

export interface TaskAdditionalInfo {
  doneBy: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
  };
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}

interface RecurringTaskDataBody {
  name: string;
  description?: string | null;
  startDate?: string;
}

interface OnceRecurringTaskData extends RecurringTaskDataBody {
  frequencyType: FrequencyType.ONCE;
}

interface DailyRecurringTaskData extends RecurringTaskDataBody {
  frequencyType: FrequencyType.DAILY;
}

interface WeeklyRecurringTaskData extends RecurringTaskDataBody {
  frequencyType: FrequencyType.WEEKLY;
  weekDays: number[];
}

interface MonthlyRecurringTaskData extends RecurringTaskDataBody {
  frequencyType: FrequencyType.MONTHLY;
  monthDay: number;
}

type RecurringTaskData =
  | OnceRecurringTaskData
  | DailyRecurringTaskData
  | WeeklyRecurringTaskData
  | MonthlyRecurringTaskData;

interface CreateTaskRequest {
  groupId: number;
  taskListId: number;
  data: RecurringTaskData;
}

// 할 일
interface GetTasksRequest {
  groupId: number;
  taskListId: number;
  date?: string;
}

// 할 일 상세
interface GetTaskDetailRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
}

interface UpdateTaskRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
  name?: string;
  description?: string;
  done?: boolean;
}

interface DeleteTaskRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
}

interface UpdateTaskOrderRequest {
  groupId: number;
  taskListId: number;
  id: number;
  displayIndex: number;
}

interface DeleteRecurringRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
  recurringId: number;
}

export type {
  CreateTaskRequest,
  GetTasksRequest,
  GetTaskDetailRequest,
  UpdateTaskRequest,
  DeleteTaskRequest,
  UpdateTaskOrderRequest,
  DeleteRecurringRequest,
};
