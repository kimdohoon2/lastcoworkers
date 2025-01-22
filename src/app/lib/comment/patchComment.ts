import { PatchTaskCommentRequest } from '@/app/types/comment';
import instance from '../instance';

// 할 일 댓글 수정
const editTaskComment = async ({
  taskId,
  commentId,
  content,
}: PatchTaskCommentRequest) => {
  const res = await instance.patch(`/tasks/${taskId}/comments/${commentId}`, {
    content,
  });
  return res.data;
};

export default editTaskComment;
