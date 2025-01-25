import axios from '@/app/lib/instance';

interface GetInivitationResponse {
  token: string;
}

const getInvitation = async (id: number): Promise<GetInivitationResponse> => {
  const res = await axios.get<GetInivitationResponse>(
    `/groups/${id}/invitation`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    },
  );

  return res.data;
};

export default getInvitation;
