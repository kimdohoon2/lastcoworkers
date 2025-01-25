import axios from 'axios';
import { ConfirmPasswordType, ResetMessage } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

const patchResetPasswordApi = async (
  confirmPassword: ConfirmPasswordType,
): Promise<ResetMessage> => {
  try {
    const response = await instance.patch<ResetMessage>(
      '/user/reset-password',
      confirmPassword,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const message =
        error.response.data?.message || '비밀번호 초기화를 실패했습니다.';
      throw new Error(message);
    }
    throw new Error(
      '네트워크 또는 기타 문제로 인해 비밀번호 초기화를 실패했습니다.',
    );
  }
};

export default patchResetPasswordApi;
