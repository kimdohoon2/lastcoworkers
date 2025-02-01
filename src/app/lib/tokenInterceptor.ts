import instance from '@/app/lib/instance';
import handleTokenRefresh from '@/app/utils/handleTokenRefresh';

// 응답 인터셉터: 401 에러 발생 시, 액세스토큰 갱신
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      return handleTokenRefresh(error.config);
    }
    return Promise.reject(error);
  },
);

export default instance;
