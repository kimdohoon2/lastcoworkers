import { AxiosError } from 'axios';
import { store } from '@/app/stores/store';
import instance from '@/app/lib/instance';
import postRefreshApi from '@/app/lib/auth/postRefreshApi';

// Refresh Token 관리 변수
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 새로운 Access Token이 발급되었을 때 큐(대기 목록)에 저장된 요청 처리
const onAccessTokenFetched = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 401 에러 발생 시 Access Token 갱신 처리

const handleTokenRefresh = async (error: AxiosError) => {
  console.log('토큰 리프레시 처리 시작');
  const state = store.getState();
  const { refreshToken } = state.auth;

  if (!refreshToken) {
    console.log('리프레시 토큰이 없습니다. 로그인이 필요합니다.');
    return Promise.reject(error);
  }

  if (!isRefreshing) {
    isRefreshing = true;
    console.log('새 액세스 토큰 요청 중...');
    try {
      const { accessToken } = await postRefreshApi({ refreshToken });
      console.log('새 액세스 토큰 발급 성공');

      store.dispatch({
        type: 'auth/setAccessToken',
        payload: accessToken,
      });
      console.log('Redux 스토어에 새 액세스 토큰 저장 완료');

      onAccessTokenFetched(accessToken);
      console.log('저장된 요청 처리 완료');
    } catch (refreshError) {
      console.error('토큰 리프레시 실패:', refreshError);
      refreshSubscribers = [];
      throw refreshError;
    } finally {
      isRefreshing = false;
      console.log('토큰 리프레시 프로세스 종료');
    }
  }

  return new Promise((resolve) => {
    console.log('요청을 큐(대기 목록)에 추가');
    refreshSubscribers.push((token: string) => {
      console.log('저장된 요청 재시도');
      const newConfig = {
        ...error.config,
        headers: {
          ...(error.config?.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      };
      resolve(instance.request(newConfig));
    });
  });
};
export default handleTokenRefresh;
