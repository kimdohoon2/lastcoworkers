import axios from 'axios';
import instance from '@/app/lib/instance';

interface OauthDataType {
  state?: string;
  redirectUri?: string;
  token: string;
  provider: 'GOOGLE' | 'KAKAO';
}

const postProviderApi = async ({
  state,
  redirectUri,
  token,
  provider,
}: OauthDataType) => {
  const quickLoginData = { state, redirectUri, token };

  console.log('Request data:', quickLoginData);
  console.log('Provider:', provider);

  try {
    const response = await instance.post(
      `/auth/signIn/${provider}`,
      quickLoginData,
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else {
      console.error('Error:');
    }
    throw error; // 에러 재발생
  }
};

export default postProviderApi;
