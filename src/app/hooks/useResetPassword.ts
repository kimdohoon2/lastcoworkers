import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import postResetPasswordApi from '@/app/lib/user/postResetPasswordApi';
import { ResetPasswordType } from '@/app/types/AuthType';
import useToast from '@/app/hooks/useToast';

const useResetPassword = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (data: ResetPasswordType) => postResetPasswordApi(data),
    onSuccess: (data) => {
      showToast({ message: data.message });
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response) {
        showToast({ message: '이메일 전송에 실패했습니다.' });
      } else {
        showToast({
          message: '이메일로 전송 중 오류가 발생했습니다. 다시 시도해 주세요.',
        });
      }
    },
  });
};

export default useResetPassword;
