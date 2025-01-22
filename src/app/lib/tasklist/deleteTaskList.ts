import { DeleteTaskListRequest } from '@/app/types/taskList';
import instance from '../instance';

// 할 일 목록 삭제
export const deleteTaskList = async ({
  groupId,
  id,
}: DeleteTaskListRequest) => {
  const res = await instance.delete(`groups/${groupId}/task-lists/${id}`);

  return res.data;
};

export default deleteTaskList;
