import axios from 'axios';
import { FormData } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

// API 응답 타입 정의
interface SignUpResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  message: string;
}

const signUpApi = async (formData: FormData): Promise<SignUpResponse> => {
  try {
    const response = await instance.post<SignUpResponse>(
      '/auth/signUp',
      formData,
    );
    console.log('회원가입 성공:', response.data); // 성공 메시지 출력
    return response.data; // 반환 데이터 타입을 SignUpResponse로 지정
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('회원가입 실패:', error.response.data); // 서버 에러 메시지 출력
      throw new Error(
        error.response.data?.message || '회원가입에 실패했습니다.',
      );
    }
    throw new Error('네트워크 또는 기타 문제로 인해 회원가입에 실패했습니다.');
  }
};

export default signUpApi;
