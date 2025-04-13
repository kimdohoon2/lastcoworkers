import { useDispatch } from 'react-redux';
import { logout } from '@/app/stores/auth/authSlice';
import { oauthlogout } from '@/app/stores/oauthSlice';
import { useRouter } from 'next/navigation';

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    console.log('[디버깅] 로그아웃 실행');

    // 로그아웃 시 쿠키 삭제 API 호출
    try {
      const response = await fetch('/api/auth/clear-cookie', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('[디버깅] 리프레시 토큰 쿠키가 성공적으로 삭제되었습니다.');
      } else {
        console.error('[에러] 리프레시 토큰 쿠키 삭제 실패');
      }
    } catch (error) {
      console.error('[에러] 쿠키 삭제 API 호출 중 오류:', error);
    }

    // Redux 상태 초기화
    dispatch(logout());
    dispatch(oauthlogout());

    // 홈페이지로 리디렉션 (선택적)
    router.push('/');
  };

  return { handleLogout };
};

export default useLogout;
