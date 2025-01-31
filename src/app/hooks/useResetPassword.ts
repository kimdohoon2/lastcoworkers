import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import postResetPasswordApi from '@/app/lib/user/postResetPasswordApi';
import { ResetPasswordType } from '@/app/types/AuthType';

const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordType) => postResetPasswordApi(data),
    onSuccess: (data) => {
      alert(data.message);
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data?.message || '이메일로 전송이 실패했습니다.');
      } else {
        alert('이메일로 전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });
};

export default useResetPassword;
