import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import patchResetPasswordApi from '@/app/lib/user/patchResetPasswordApi';
import { ConfirmPasswordType } from '@/app/types/AuthType';
import { useRouter } from 'next/navigation';
import useToast from '@/app/hooks/useToast';

const useConfirmPassword = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: (data: ConfirmPasswordType) => patchResetPasswordApi(data),
    onSuccess: () => {
      showToast({
        message: '비밀번호 재설정이 완료되었습니다.',
        type: 'success',
      });
      router.push('/login');
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response) {
        showToast({
          message: '비밀번호 재설정에 실패했습니다.',
          type: 'error',
        });
      } else {
        showToast({
          message:
            '비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해 주세요.',
          type: 'error',
        });
      }
    },
  });
};

export default useConfirmPassword;
