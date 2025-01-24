import axios from 'axios';
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

  console.log('현재 토큰:', token); // 토큰 값 콘솔 출력

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization 헤더:', config.headers.Authorization);
  }

  return config;
});

export default instance;
