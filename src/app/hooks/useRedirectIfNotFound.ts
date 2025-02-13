import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useRedirectIfNotFound = (isNotFound: boolean) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isNotFound) {
      setIsRedirecting(true);
      router.replace('/notfound');
    }
  }, [isNotFound, router]);

  return { isRedirecting };
};

export default useRedirectIfNotFound;
