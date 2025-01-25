import axios from 'axios';
import { store } from '@/app/stores/store';
import handleTokenRefresh from '@/app/lib/auth/refreshTokenHandler';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Access Token 추가
instance.interceptors.request.use((config) => {
  console.log('요청 인터셉터 실행');
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('요청에 액세스 토큰 추가됨');
  } else {
    console.log('액세스 토큰 없음');
  }

  return config;
});

// 응답 인터셉터: 401 에러 처리
instance.interceptors.response.use(
  (response) => {
    console.log('응답 성공');
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      console.log('401 에러 발생: 토큰 리프레시 시도');
      return handleTokenRefresh(error);
    }
    console.error('요청 실패:', error.message);
    return Promise.reject(error);
  },
);

export default instance;
