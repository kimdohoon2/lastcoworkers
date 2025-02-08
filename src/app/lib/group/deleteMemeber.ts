import axios from '@/app/lib/instance';

interface DeleteMemberRequest {
  groupId: number;
  userId: number;
}

const deleteMember = async ({ groupId, userId }: DeleteMemberRequest) => {
  await axios.delete(`/groups/${groupId}/member/${userId}`, {});
};

export default deleteMember;
