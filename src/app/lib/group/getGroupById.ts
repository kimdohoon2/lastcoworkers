import axios from '@/app/lib/instance';
import { GroupResponse } from '@/app/types/grouptask';

const getGroupById = async (id: number): Promise<GroupResponse> => {
  const res = await axios.get<GroupResponse>(`/groups/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res.data;
};

export default getGroupById;
