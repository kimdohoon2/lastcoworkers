import Image from 'next/image';
import postOauthApi from '@/app/lib/oauth/postOauthApi';

interface OAuthResponse {
  createdAt: string;
  updatedAt: string;
  appSecret: string;
  appKey: string;
  provider: 'KAKAO';
  teamId: string;
  id: number;
}

export default function QuickLogin() {
  const KAKAO_REST_API = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const handleLogin = async (provider: 'KAKAO', url: string) => {
    try {
      console.log(`${provider} OAuth 앱 등록 시도 중...`);
      const result = await postOauthApi({
        provider,
        appKey: KAKAO_REST_API,
      });
      console.log(`OAuth 앱 등록 결과:`, result);

      const oauthResponse = result as OAuthResponse;
      if (oauthResponse && oauthResponse.id) {
        console.log(`${provider} OAuth 앱 등록 성공. ID: ${oauthResponse.id}`);
        setTimeout(() => {
          window.location.href = url;
        }, 2000);
      } else {
        console.error(
          `${provider} OAuth 앱 등록 실패. 예상치 못한 응답:`,
          result,
        );
      }
    } catch (err) {
      console.error(`${provider} OAuth 앱 등록 중 오류 발생:`, err);
    }
  };

  return (
    <div className="mb-8 tablet:mb-[6.25rem]">
      <div className="mb-4 mt-6 flex w-full items-center justify-between tablet:mt-12">
        <p className="relative inline-flex w-full items-center justify-between before:block before:h-px before:w-[8.5rem] before:bg-border-primary before:content-[''] after:block after:h-px after:w-[8.5rem] after:bg-border-primary after:content-[''] tablet:before:w-[12rem] tablet:after:w-[12rem]">
          OR
        </p>
      </div>
      <div className="flex justify-between">
        <p>간편 로그인하기</p>
        <div className="flex gap-4">
          <button
            className="relative h-[2.625rem] w-[2.625rem] rounded-full bg-[#F1E148]"
            onClick={() => handleLogin('KAKAO', kakaoLink)}
          >
            <div className="absolute left-1/2 top-1/2 h-[1.375rem] w-[1.625rem] -translate-x-1/2 -translate-y-1/2 transform">
              <Image
                className="h-full w-full"
                src="/icons/kakao.png"
                alt="kakao"
                width={26}
                height={24}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
