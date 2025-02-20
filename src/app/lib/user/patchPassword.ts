import instance from '../instance';

export interface PatchPasswordRequest {
  passwordConfirmation: string;
  password: string;
}

export interface PatchPasswordResponse {
  message: string;
}

export default async function patchPassword(
  requestData: PatchPasswordRequest,
): Promise<PatchPasswordResponse> {
  const { data } = await instance.patch<PatchPasswordResponse>(
    'user/password',
    requestData,
  );
  return data;
}
