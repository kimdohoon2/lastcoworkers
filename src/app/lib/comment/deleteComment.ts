import instance from '../instance';

interface DeleteTaskCommentRequest {
  taskId: number;
  commentId: number;
}

// 할 일 댓글 삭제
const deleteTaskComment = async ({
  taskId,
  commentId,
}: DeleteTaskCommentRequest) => {
  const res = await instance.delete(`/tasks/${taskId}/comments/${commentId}`);
  return res.data;
};

export default deleteTaskComment;
