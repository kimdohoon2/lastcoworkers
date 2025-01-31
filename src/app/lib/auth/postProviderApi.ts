import instance from '@/app/lib/instance';
import { SignInResponse } from '@/app/types/AuthType';

interface OauthDataType {
  state: string;
  redirectUri: string;
  token: string;
}

const postProviderApi = async (
  provider: 'GOOGLE' | 'KAKAO',
  data: OauthDataType,
): Promise<SignInResponse> => {
  console.log('Request data:', data);

  const response = await instance.post(`/auth/signIn/${provider}`, data);
  return response.data as SignInResponse;
};

export default postProviderApi;
