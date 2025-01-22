interface GetTaskCommentRequest {
  taskId: number;
}

interface PostTaskCommentRequest {
  taskId: number;
  content: string;
}

interface PatchTaskCommentRequest {
  taskId: number;
  commentId: number;
  content: string;
}

interface DeleteTaskCommentRequest {
  taskId: number;
  commentId: number;
}

export type {
  GetTaskCommentRequest,
  PostTaskCommentRequest,
  PatchTaskCommentRequest,
  DeleteTaskCommentRequest,
};
