import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { GroupResponse } from '../types/grouptask';

const useRedirectIfNotMember = ({
  isLoading,
  groupData,
}: {
  isLoading: boolean;
  groupData?: GroupResponse;
}) => {
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const redirect = useCallback(() => {
    setIsRedirecting(true);
    alert('접근제한: 팀의 멤버가 아닙니다!');
    router.replace('/');
  }, [router]);

  useEffect(() => {
    if (
      !isLoading &&
      groupData &&
      !groupData.members.some(({ userId: id }) => id === Number(userId))
    ) {
      redirect();
    }
  }, [isLoading, groupData, userId, redirect]);

  return { isRedirecting };
};

export default useRedirectIfNotMember;
