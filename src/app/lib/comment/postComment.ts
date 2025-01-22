import { PostTaskCommentRequest } from '@/app/types/comment';
import instance from '../instance';

// 할 일 댓글 생성
const createTaskComment = async ({
  taskId,
  content,
}: PostTaskCommentRequest) => {
  const res = await instance.post(`/tasks/${taskId}/comments`, { content });

  return res.data;
};

export default createTaskComment;
