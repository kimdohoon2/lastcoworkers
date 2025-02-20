import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import postResetPasswordApi from '@/app/lib/user/postResetPasswordApi';
import { ResetPasswordType } from '@/app/types/AuthType';
import useToast from '@/app/hooks/useToast';

const useResetPassword = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (data: ResetPasswordType) => postResetPasswordApi(data),
    onSuccess: () => {
      showToast({
        message: '이메일 전송 성공!😊',
        type: 'success',
      });
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response) {
        showToast({ message: '이메일 전송에 실패했어요.🙁', type: 'error' });
      } else {
        showToast({
          message: '이메일로 전송 중 오류가 발생했어요.🙁',
          type: 'error',
        });
      }
    },
  });
};

export default useResetPassword;
