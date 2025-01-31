import { ConfirmPasswordType, ResetMessage } from '@/app/types/AuthType';
import instance from '@/app/lib/instance';

const patchResetPasswordApi = async (
  confirmPassword: ConfirmPasswordType,
): Promise<ResetMessage> => {
  const response = await instance.patch<ResetMessage>(
    '/user/reset-password',
    confirmPassword,
  );
  return response.data;
};

export default patchResetPasswordApi;
