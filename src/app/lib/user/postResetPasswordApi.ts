import { ResetPasswordType, ResetMessage } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

const postResetPasswordApi = async (
  resetPassword: ResetPasswordType,
): Promise<ResetMessage> => {
  const response = await instance.post<ResetMessage>(
    '/user/send-reset-password-email',
    resetPassword,
  );
  return response.data;
};

export default postResetPasswordApi;
