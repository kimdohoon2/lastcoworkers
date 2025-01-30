export enum FrequencyType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  ONCE = 'ONCE',
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
  name?: string;
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
  data: RecurringTaskDataBody;
}

export type { Task, RecurringTaskData, RecurringTaskDataBody, PostTaskRequest };
