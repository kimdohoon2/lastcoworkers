import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuthRedirect = () => {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      setTimeout(() => {
        alert('로그인 후 이용할 수 있습니다.');
        router.replace('/login');
      }, 300);
    } else {
      setIsLoading(false);
    }
  }, [accessToken, router]);

  return { isLoading };
};

export default useAuthRedirect;
