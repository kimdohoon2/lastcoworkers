import instance from '../instance';

interface GroupMember {
  role: 'ADMIN' | 'MEMBER';
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

interface Task {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: string[];
}

interface GetGroupResponse {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: GroupMember[];
  taskLists: Task[];
}

interface GetGroupRequest {
  teamId: string;
  id: number;
}

// 그룹 조회
const getGroup = async ({
  teamId,
  id,
}: GetGroupRequest): Promise<GetGroupResponse> => {
  const res = await instance.get<GetGroupResponse>(`/${teamId}/groups/${id}`);

  return res.data;
};

export default getGroup;
