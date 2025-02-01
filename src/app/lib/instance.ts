import axios from 'axios';
import handleTokenRefresh from '@/app/utils/handleTokenRefresh';
import { store } from '@/app/stores/store';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Access Token 추가
instance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return handleTokenRefresh(error.config);
    }
    return Promise.reject(error);
  },
);

export default instance;
