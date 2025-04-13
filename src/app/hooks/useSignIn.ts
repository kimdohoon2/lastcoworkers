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

      console.log('로그인 성공');

      // 리프레시 토큰을 HTTP-only 쿠키로 저장하기 위해 API 라우트 호출
      fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => {
          if (!res.ok) {
            console.error('리프레시 토큰 쿠키 저장 실패');
          }
        })
        .catch((error) => {
          console.error('쿠키 설정 API 호출 중 오류:', error);
        });

      // Redux에 액세스 토큰과 사용자 정보만 저장
      dispatch(setCredentials({ accessToken, user }));

      // 메인 페이지로 리디렉션
      router.push('/');
    },
    onError: (error: unknown) => {
      console.error('로그인 실패:', error);
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
