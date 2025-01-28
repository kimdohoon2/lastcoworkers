import instance from '../instance';

export interface PatchPasswordResponse {
  message: string;
}

export default async function patchPassword(): Promise<PatchPasswordResponse> {
  const { data } = await instance.patch<PatchPasswordResponse>('user/password');
  return data;
}
