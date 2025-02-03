import { GroupResponse } from '@/app/types/grouptask';
import instance from '../instance';

interface GetGroupRequest {
  id: number;
}

// 그룹 조회
const getGroup = async ({ id }: GetGroupRequest): Promise<GroupResponse> => {
  const res = await instance.get<GroupResponse>(`/groups/${id}`);
  return res.data;
};

export default getGroup;
