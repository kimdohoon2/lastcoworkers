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
      showToast({
        message: '회원가입 완료!😊',
        type: 'success',
      });
      router.push('/login');
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response) {
        showToast({ message: '회원가입에 실패했어요.🙁', type: 'error' });
      } else {
        showToast({
          message: '회원가입 중 오류가 발생했어요.🙁',
          type: 'error',
        });
      }
    },
  });
};

export default useSignUp;
