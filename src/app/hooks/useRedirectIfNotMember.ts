import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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

  useEffect(() => {
    if (
      !isLoading &&
      groupData &&
      !groupData.members.some(({ userId }) => userId === Number(user?.id))
    ) {
      alert('접근제한: 팀의 멤버가 아닙니다!');
      router.replace('/');
    }
  }, [isLoading, groupData, router, user?.id]);
};

export default useRedirectIfNotMember;
