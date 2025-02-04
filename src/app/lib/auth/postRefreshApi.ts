import axios from 'axios';

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

const postRefreshApi = async (
  refreshTokenRequest: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const response = await axios.post<RefreshTokenResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}auth/refresh-token`,
    refreshTokenRequest,
  );

  return response.data;
};

export default postRefreshApi;
