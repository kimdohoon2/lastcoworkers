import instance from '../instance';

export interface PatchUserRequest {
  nickname?: string;
  image?: string;
}

export interface PatchUserResponse {
  message: string;
}

export default async function patchUser(
  updateData: PatchUserRequest,
): Promise<PatchUserResponse> {
  const { data } = await instance.patch<PatchUserResponse>(
    '/user',
    updateData, // nickname 또는 image만 포함 가능
    { headers: { 'Content-Type': 'application/json' } },
  );
  return data;
}
