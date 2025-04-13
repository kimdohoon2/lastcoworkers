import axios, { AxiosRequestConfig } from 'axios';
import { store } from '@/app/stores/store';
import { setAccessToken } from '@/app/stores/auth/authSlice';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onAccessTokenFetched = (token: string) => {
  // 저장된 모든 요청 콜백을 실행
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const handleTokenRefresh = async (errorConfig: AxiosRequestConfig) => {
  console.log('토큰 갱신 프로세스 시작');

  const retryRequest = new Promise((resolve, reject) => {
    refreshSubscribers.push((token: string) => {
      const newConfig = {
        ...errorConfig,
        headers: {
          ...errorConfig.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      // 토큰 갱신 후 재시도할 요청을 실행
      axios.request(newConfig).then(resolve).catch(reject);
    });
  });

  if (!isRefreshing) {
    // 만약 토큰 갱신이 진행 중이지 않으면
    isRefreshing = true;

    try {
      // API 라우트 호출 (리프레시 토큰은 쿠키에서 자동으로 전송됨)
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // 쿠키 포함
      });

      if (!response.ok) {
        throw new Error(`토큰 갱신 실패: ${response.status}`);
      }

      const data = await response.json();
      console.log('새 액세스 토큰 발급 완료');

      // Redux 상태에 새 액세스 토큰 저장
      store.dispatch(setAccessToken(data.accessToken));

      // 대기 중인 모든 요청 콜백을 실행
      onAccessTokenFetched(data.accessToken);
    } catch (refreshError) {
      console.error('토큰 갱신에 실패했습니다:', refreshError);
      // 리프레시 토큰으로 갱신이 실패하면 에러를 반환
      refreshSubscribers = [];
      isRefreshing = false;
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  } else {
    // 이미 토큰 갱신 중이라면 대기 중인 요청을 저장하고, 갱신된 토큰을 가지고 요청을 재시도
    console.log('토큰 갱신 진행 중, 요청 대기 중');
  }

  return retryRequest;
};

export default handleTokenRefresh;
