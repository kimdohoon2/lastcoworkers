import instance from '@/app/lib/instance';

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

const postRefreshApi = async (
  refreshTokenRequest: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const response = await instance.post<RefreshTokenResponse>(
    '/auth/refresh',
    refreshTokenRequest,
  );
  return response.data;
};

export default postRefreshApi;
