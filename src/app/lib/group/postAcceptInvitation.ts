import axios from '@/app/lib/instance';

interface AcceptInvitationRequest {
  userEmail: string;
  token: string;
}

interface AcceptInvitationResponse {
  groupId: number;
}

const postAcceptInvitation = async (
  data: AcceptInvitationRequest,
): Promise<AcceptInvitationResponse> => {
  const res = await axios.post<AcceptInvitationResponse>(
    '/groups/accept-invitation',
    data,
  );

  return res.data;
};

export default postAcceptInvitation;
