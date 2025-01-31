'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import postProviderApi from '@/app/lib/auth/postProviderApi';
import { setCredentials } from '@/app/stores/auth/authSlice';

export default function KaKaoCallback() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

      if (!code) {
        alert('인증 코드가 누락되었습니다.');
        router.push('/login');
        return;
      }

      const handleKaKaoCallback = async () => {
        try {
          const response = await postProviderApi('KAKAO', {
            state: '',
            redirectUri: KAKAO_REDIRECT_URI || '',
            token: code,
          });
          console.log('Response:', response);

          if (response) {
            dispatch(setCredentials(response));
            router.push('/');
          }
        } catch (error) {
          console.error('소셜 로그인 오류:', error);
          alert('로그인에 실패했습니다.');
          router.push('/login');
        }
      };

      handleKaKaoCallback();
    }
  }, [router, dispatch]);

  return <></>;
}
