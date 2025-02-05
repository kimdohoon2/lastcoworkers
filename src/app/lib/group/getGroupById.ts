import axios from '@/app/lib/instance';
import { GroupTask } from '@/app/types/grouptask';

type GroupResponse = {
  image?: string | null;
  name: string;
  taskLists: GroupTask[];
};

const getGroupById = async (id: number): Promise<GroupResponse> => {
  const res = await axios.get<GroupResponse>(`/groups/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res.data;
};

export default getGroupById;
