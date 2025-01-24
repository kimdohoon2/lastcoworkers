import instance from '../instance';

export interface DeleteUserResponse {
  teamId: string;
  image: string;
  nickname: string;
  updateAt: string;
  createdAt: string;
  email: string;
  id: number;
}

export default async function deleteUser(): Promise<DeleteUserResponse> {
  const { data } = await instance.delete<DeleteUserResponse>('user');
  return data;
}
