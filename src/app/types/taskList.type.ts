import { Task } from './task.type';

interface GetTaskListRequest {
  groupId: number;
  id: number;
  date: string;
}

interface GetTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

interface UpdateTaskListRequest {
  groupId: number;
  id: number;
  name: string;
}

interface UpdateTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

interface DeleteTaskListRequest {
  groupId: number;
  id: number;
}

interface CreateTaskListRequest {
  groupId: number;
  name: string;
}

interface CreateTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

interface UpdateTaskListOrderRequest {
  groupId: number;
  id: number;
  displayIndex: number;
}

export type {
  GetTaskListRequest,
  GetTaskListResponse,
  UpdateTaskListRequest,
  UpdateTaskListResponse,
  DeleteTaskListRequest,
  CreateTaskListRequest,
  CreateTaskListResponse,
  UpdateTaskListOrderRequest,
};
