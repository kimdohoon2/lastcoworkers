import axios from 'axios';
import { ResetPasswordType, ResetMessage } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

const postResetPasswordApi = async (
  resetPassword: ResetPasswordType,
): Promise<ResetMessage> => {
  try {
    const response = await instance.post<ResetMessage>(
      '/user/send-reset-password-email',
      resetPassword,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message =
        error.response.data?.message || '링크 전송에 실패했습니다.';
      throw new Error(message);
    }
    throw new Error('네트워크 또는 기타 문제로 인해 링크 전송에 실패했습니다.');
  }
};

export default postResetPasswordApi;
