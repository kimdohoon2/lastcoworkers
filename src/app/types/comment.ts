export interface GetTaskCommentRequest {
  taskId: number;
}

export interface PostTaskCommentRequest {
  taskId: number;
  content: string;
}

export interface UpdateTaskCommentRequest {
  taskId: number;
  commentId: number;
  content: string;
}

export interface DeleteTaskCommentRequest {
  taskId: number;
  commentId: number;
}
