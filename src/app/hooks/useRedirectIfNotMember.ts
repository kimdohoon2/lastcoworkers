import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GroupResponse } from '../types/grouptask';

const useRedirectIfNotMember = ({
  isLoading,
  groupData,
}: {
  isLoading: boolean;
  groupData?: GroupResponse;
}) => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      groupData &&
      !groupData.members.some(({ userId }) => userId === Number(user?.id))
    ) {
      setIsRedirecting(true);
      alert('접근제한: 팀의 멤버가 아닙니다!');
      router.replace('/');
    }
  }, [isLoading, groupData, router, user?.id]);

  return { isRedirecting };
};

export default useRedirectIfNotMember;
