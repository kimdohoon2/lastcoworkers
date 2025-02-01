import axios from '@/app/lib/instance';

const getInvitation = async (id: number): Promise<string> => {
  const res = await axios.get<string>(`/groups/${id}/invitation`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res.data;
};

export default getInvitation;
