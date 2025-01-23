import instance from '../instance';

interface GetTaskCommentRequest {
  taskId: number;
}

// 할 일 댓글 조회
const getTaskComment = async ({ taskId }: GetTaskCommentRequest) => {
  const res = await instance.get(`/tasks/${taskId}/comments`);

  return res.data;
};

export default getTaskComment;
