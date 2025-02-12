import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import { useEffect, useState } from 'react';

const useAuthRedirect = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 후 이용할 수 있습니다.');
    } else {
      setIsLoading(false);
    }
  }, [accessToken]);

  return { isLoading };
};

export default useAuthRedirect;
