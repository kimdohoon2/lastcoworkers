import instance from '../instance';

type Role = 'ADMIN' | 'MEMBER';

export interface GetUserResponse {
  teamId: string;
  image: string;
  nickname: string;
  updateAt: string;
  createdAt: string;
  email: string;
  id: number;
  memberships: Membership[];
}

export interface Membership {
  group: Group[];
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface Group {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

export default async function getUser(): Promise<GetUserResponse> {
  const { data } = await instance.get<GetUserResponse>('/user');
  return data;
}
