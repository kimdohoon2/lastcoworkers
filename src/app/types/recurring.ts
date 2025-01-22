import { RecurringTaskDataBody } from './task';

export interface PostRecurringTaskRequest {
  groupId: number;
  taskListId: number;
  data: RecurringTaskDataBody;
}
