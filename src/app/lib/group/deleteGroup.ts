import axios from '@/app/lib/instance';

interface DeleteGroupRequest {
  groupId: number;
}

const deleteGroup = async ({ groupId }: DeleteGroupRequest) => {
  await axios.delete(`/groups/${groupId}`);
};

export default deleteGroup;
