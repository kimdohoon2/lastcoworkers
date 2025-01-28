import instance from '../instance';

export interface GetUserResponse {
  teamId: string;
  image: string;
  nickname: string;
  updateAt: string;
  createdAt: string;
  email: string;
  id: number;
}

export default async function getUser(): Promise<GetUserResponse> {
  const { data } = await instance.get<GetUserResponse>('/user');
  return data;
}
