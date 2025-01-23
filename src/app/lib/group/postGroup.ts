import axios from '@/app/lib/instance';
import { GroupData } from '@/app/types/group';

type PostGroupResponse = {
  data: {
    id: string;
  };
};

const postGroup = async (data: GroupData): Promise<PostGroupResponse> => {
  const res = await axios.post('groups', data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res;
};

export default postGroup;
