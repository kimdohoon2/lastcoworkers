import axios from 'axios';
import { store } from '@/app/stores/store';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3OSwidGVhbUlkIjoiMTEtOCIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzM4MjMxODk5LCJleHAiOjE3MzgyMzU0OTksImlzcyI6InNwLWNvd29ya2VycyJ9.5sAVxOt0B2rKOILvMsE_6L5BoZUm3hlNyGnD8K8OrKM';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
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

export default instance;
