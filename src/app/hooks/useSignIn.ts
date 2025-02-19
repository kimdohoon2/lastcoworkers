import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import postSignInApi from '@/app/lib/auth/postSignInApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/app/stores/auth/authSlice';
import { useRouter } from 'next/navigation';
import useToast from '@/app/hooks/useToast';

const useSignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: postSignInApi,
    onSuccess: (data) => {
      const { accessToken, refreshToken, user } = data;

      // Redux에 로그인 정보 저장
      dispatch(setCredentials({ accessToken, refreshToken, user }));

      // 메인 페이지로 리디렉션
      router.push('/');
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response) {
        showToast({ message: '로그인에 실패했어요.🙁', type: 'error' });
      } else {
        showToast({
          message: '로그인 중 오류가 발생했어요.🙁',
          type: 'error',
        });
      }
    },
  });
};

export default useSignIn;
