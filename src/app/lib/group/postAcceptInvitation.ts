import axios from '@/app/lib/instance';

interface AcceptInvitationRequest {
  userEmail: string;
  token: string;
}

const postAcceptInvitation = async (
  data: AcceptInvitationRequest,
): Promise<string> => {
  const res = await axios.post<string>('/groups/accept-invitation', data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });

  return res.data;
};

export default postAcceptInvitation;
