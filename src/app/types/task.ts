enum FrequencyType {
  DAILY,
  WEEKLY,
  MONTHLY,
  ONCE,
}

interface Task extends BaseTask, TaskAdditionalInfo {}

interface BaseTask {
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

interface TaskAdditionalInfo {
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

interface RecurringTaskData {
  name: string;
  description?: string | null;
  startDate?: string;
}

interface OnceRecurringTaskData extends RecurringTaskData {
  frequencyType: FrequencyType.ONCE;
}

interface DailyRecurringTaskData extends RecurringTaskData {
  frequencyType: FrequencyType.DAILY;
}

interface WeeklyRecurringTaskData extends RecurringTaskData {
  frequencyType: FrequencyType.WEEKLY;
  weekDays: number[];
}

interface MonthlyRecurringTaskData extends RecurringTaskData {
  frequencyType: FrequencyType.MONTHLY;
  monthDay: number;
}

type RecurringTaskDataBody =
  | OnceRecurringTaskData
  | DailyRecurringTaskData
  | WeeklyRecurringTaskData
  | MonthlyRecurringTaskData;

interface PostTaskRequest {
  groupId: number;
  taskListId: number;
  data: RecurringTaskData;
}

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

interface PatchTaskRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
  name?: string;
  description?: string;
  done?: boolean;
}

interface PatchTaskOrderRequest {
  groupId: number;
  taskListId: number;
  id: number;
  displayIndex: number;
}

interface DeleteTaskRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
}

interface DeleteRecurringRequest {
  groupId: number;
  taskListId: number;
  taskId: number;
  recurringId: number;
}

export type {
  Task,
  RecurringTaskDataBody,
  PostTaskRequest,
  GetTasksRequest,
  GetTaskDetailRequest,
  PatchTaskRequest,
  PatchTaskOrderRequest,
  DeleteTaskRequest,
  DeleteRecurringRequest,
};
