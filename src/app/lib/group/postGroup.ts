import axios from '@/app/lib/instance';
import { GroupData } from '@/app/types/group';

type PostGroupResponse = {
  id: string;
};

const postGroup = async (data: GroupData): Promise<PostGroupResponse> => {
  const res = await axios.post<PostGroupResponse>('groups', data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res.data;
};

export default postGroup;
