import { useMutation } from '@tanstack/react-query';
import patchResetPasswordApi from '@/app/lib/user/patchResetPasswordApi';
import { ConfirmPasswordType } from '@/app/types/AuthType';
import { useRouter } from 'next/navigation';

const useConfirmPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ConfirmPasswordType) => patchResetPasswordApi(data),
    onSuccess: () => {
      alert('비밀번호 재설정이 완료되었습니다.');
      router.push('/login');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};

export default useConfirmPassword;
