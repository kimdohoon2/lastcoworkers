import axios from '@/app/lib/instance';
import { GroupData } from '@/app/types/group';

type PostGroupResponse = {
  id: string;
};

const postGroup = async (data: GroupData): Promise<PostGroupResponse> => {
  const res = await axios.post<PostGroupResponse>('groups', data);

  return res.data;
};

export default postGroup;
