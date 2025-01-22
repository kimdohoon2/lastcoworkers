import { Task } from './task';

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

interface PostTaskListRequest {
  groupId: number;
  name: string;
}

interface PostTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

interface PatchTaskListRequest {
  groupId: number;
  id: number;
  name: string;
}

interface PatchTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

interface PatchTaskListOrderRequest {
  groupId: number;
  id: number;
  displayIndex: number;
}

interface DeleteTaskListRequest {
  groupId: number;
  id: number;
}

export type {
  GetTaskListRequest,
  GetTaskListResponse,
  PostTaskListRequest,
  PostTaskListResponse,
  PatchTaskListRequest,
  PatchTaskListResponse,
  PatchTaskListOrderRequest,
  DeleteTaskListRequest,
};
