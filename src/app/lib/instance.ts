import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3OSwidGVhbUlkIjoiMTEtOCIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzM4MzIzMjg4LCJleHAiOjE3MzgzMjY4ODgsImlzcyI6InNwLWNvd29ya2VycyJ9._Vr_3o4fuilIOdcCKyLmV7MRH1mAqb6NcDsH4j60nk0';
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
