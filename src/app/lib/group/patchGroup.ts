import axios from '@/app/lib/instance';
import { GroupData } from '@/app/types/group';

const patchGroup = async (id: number, data: GroupData) => {
  const res = await axios.patch(`groups/${id}`, data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res;
};

export default patchGroup;
