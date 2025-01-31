import { FormData, SignUpResponse } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

const SignUpApi = async (formData: FormData): Promise<SignUpResponse> => {
  const response = await instance.post<SignUpResponse>(
    '/auth/signUp',
    formData,
  );
  return response.data;
};
export default SignUpApi;
