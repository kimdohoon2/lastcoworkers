import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import SignUpApi from '@/app/lib/auth/postSignUpApi';
import { useRouter } from 'next/navigation';
import useToast from '@/app/hooks/useToast';

const useSignUp = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: SignUpApi,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response) {
        showToast({ message: '회원가입에 실패했습니다.' });
      } else {
        showToast({
          message: '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.',
        });
      }
    },
  });
};

export default useSignUp;
