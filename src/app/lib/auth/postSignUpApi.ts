import axios from 'axios';
import { FormData } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

interface SignUpResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  message: string;
}

const SignUpApi = async (formData: FormData): Promise<SignUpResponse> => {
  try {
    const response = await instance.post<SignUpResponse>(
      '/auth/signUp',
      formData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message =
        error.response.data?.message || '회원가입에 실패했습니다.';
      throw new Error(message);
    }
    throw new Error('네트워크 또는 기타 문제로 인해 회원가입에 실패했습니다.');
  }
};

export default SignUpApi;
