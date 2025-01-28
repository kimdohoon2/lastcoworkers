import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3OSwidGVhbUlkIjoiMTEtOCIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzM4MDc3NTU0LCJleHAiOjE3MzgwODExNTQsImlzcyI6InNwLWNvd29ya2VycyJ9.jA_fWfDPA6Yu6eg2e7szzUP6D5qtKhmAkHMmnH6KLpQ';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default instance;

// Access Token을 요청 헤더에 동적으로 추가
// instance.interceptors.request.use(
//   (config) => {
//     const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN; // 환경변수에서 토큰 가져오기
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );
