import axios, { AxiosRequestConfig } from 'axios';
import { store } from '@/app/stores/store';
import postRefreshApi from '@/app/lib/auth/postRefreshApi';
import { setAccessToken } from '@/app/stores/auth/authSlice';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onAccessTokenFetched = (token: string) => {
  // 저장된 모든 요청 콜백을 실행
  console.log(
    '[디버깅] 새로운 액세스 토큰을 받아 대기 중인 요청을 처리합니다.',
  );
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const handleTokenRefresh = async (errorConfig: AxiosRequestConfig) => {
  const state = store.getState();
  const { refreshToken } = state.auth;

  if (!refreshToken) {
    console.log(
      '[ERROR] 리프레시 토큰이 없습니다. 액세스 토큰을 갱신할 수 없습니다.',
    );
    // 리프레쉬토큰이 없으면 토큰 갱신을 할 수 없으므로 에러를 반환
    return Promise.reject(errorConfig);
  }

  const retryRequest = new Promise((resolve, reject) => {
    refreshSubscribers.push((token: string) => {
      console.log('[디버깅] 새로운 토큰으로 요청을 재시도합니다.');
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
    console.log('[디버깅] 토큰 갱신 프로세스를 시작합니다.');
    // 만약 토큰 갱신이 진행 중이지 않으면
    isRefreshing = true;

    try {
      console.log('[디버깅] 액세스 토큰을 갱신하기 위한 요청을 보냅니다.');
      // 리프레쉬토큰을 사용해 새로운 액세스토큰을 요청
      const { accessToken } = await postRefreshApi({ refreshToken });

      console.log('[디버깅] 새 액세스 토큰을 받았습니다: ', accessToken);

      // Redux 상태에 새로운 액세스토큰 저장
      store.dispatch(setAccessToken(accessToken));

      // 대기 중인 모든 요청 콜백을 실행
      onAccessTokenFetched(accessToken);
    } catch (refreshError) {
      console.error('[ERROR] 토큰 갱신에 실패했습니다:', refreshError);
      // 리프레쉬 토큰으로 갱신이 실패하면 에러를 반환
      return await Promise.reject(refreshError);
    } finally {
      console.log('[디버깅] 토큰 갱신 프로세스가 완료되었습니다.');
      isRefreshing = false;
    }
  }

  // 이미 토큰 갱신 중이라면 대기 중인 요청을 저장하고, 갱신된 토큰을 가지고 요청을 재시도
  console.log(
    '[디버깅] 토큰 갱신이 진행 중이므로 요청을 대기 큐에 추가합니다.',
  );

  return retryRequest;
};

export default handleTokenRefresh;
