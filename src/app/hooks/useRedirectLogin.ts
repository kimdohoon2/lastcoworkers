import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useRedirectLogin = () => {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 후 이용할 수 있습니다.');
      router.push('/login');
    }
  }, [accessToken, router]);
};

export default useRedirectLogin;
