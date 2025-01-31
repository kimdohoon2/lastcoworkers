import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import postSignInApi from '@/app/lib/auth/postSignInApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/app/stores/auth/authSlice';
import { useRouter } from 'next/navigation';

const useSignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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
        alert(error.response.data?.message || '로그인에 실패했습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });
};

export default useSignIn;
