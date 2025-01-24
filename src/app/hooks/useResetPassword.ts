import { useMutation } from '@tanstack/react-query';
import postResetPasswordApi from '@/app/lib/user/postResetPasswordApi';
import { ResetPasswordType } from '@/app/types/AuthType';

const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordType) => postResetPasswordApi(data),
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};

export default useResetPassword;
