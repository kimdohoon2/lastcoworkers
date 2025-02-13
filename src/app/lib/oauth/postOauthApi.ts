import instance from '@/app/lib/instance';

interface OauthData {
  appSecret?: string;
  appKey?: string;
  provider: 'KAKAO';
}

const postOauthApi = async (data: OauthData) => {
  const response = await instance.post('/oauthApps', data);
  console.log('등록:', response.data);
  return response.data;
};

export default postOauthApi;
