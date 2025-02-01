import { FormData, SignInResponse } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

const postSignInApi = async (formData: FormData): Promise<SignInResponse> => {
  const response = await instance.post<SignInResponse>(
    '/auth/signIn',
    formData,
  );
  return response.data;
};

export default postSignInApi;
