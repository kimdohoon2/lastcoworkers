import axios from 'axios';
import { FormData, SignInResponse } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

const SignInApi = async (formData: FormData): Promise<SignInResponse> => {
  try {
    const response = await instance.post<SignInResponse>(
      '/auth/signIn',
      formData,
    );
    console.log('로그인', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || '로그인에 실패했습니다.';
      throw new Error(message);
    }
    throw new Error('네트워크 또는 기타 문제로 인해 로그인에 실패했습니다.');
  }
};

export default SignInApi;
