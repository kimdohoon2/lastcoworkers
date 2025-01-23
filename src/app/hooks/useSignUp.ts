import { useMutation } from '@tanstack/react-query';
import SignUpApi from '@/app/lib/auth/postSignUpApi';
import { useRouter } from 'next/navigation';

const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: SignUpApi,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};

export default useSignUp;
