'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import postProviderApi from '@/app/lib/auth/postProviderApi';
import { setCredentials } from '@/app/stores/auth/authSlice';
import useToast from '@/app/hooks/useToast';

export default function KaKaoCallback() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

      if (!code) {
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

          if (response) {
            dispatch(setCredentials(response));
            router.push('/');
          }
        } catch (error) {
          showToast({ message: '로그인에 실패했어요.🙁', type: 'error' });
          router.push('/login');
        }
      };

      handleKaKaoCallback();
    }
  }, [router, dispatch]);

  return <></>;
}
