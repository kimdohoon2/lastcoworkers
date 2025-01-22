import { RecurringTaskData } from './task';

export interface CreateRecurringTaskRequest {
  groupId: number;
  taskListId: number;
  data: RecurringTaskData;
}
