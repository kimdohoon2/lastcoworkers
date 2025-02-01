import axios from '@/app/lib/instance';

interface DeleteMemberRequest {
  groupId: number;
  userId: number;
}

const deleteMember = async ({ groupId, userId }: DeleteMemberRequest) => {
  await axios.delete(`/groups/${groupId}/member/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });
};

export default deleteMember;
