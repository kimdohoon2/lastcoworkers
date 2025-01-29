import Image from 'next/image';

export default function QuickLogin() {
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_KEY; // Google 클라이언트 ID
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI; // Google 리다이렉트 URI
  const KAKAO_REST_API = process.env.NEXT_PUBLIC_KAKAO_APP_KEY; // Kakao REST_API
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI; // Kakao 리다이렉트 URI
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const googleLink = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

  const handleLogin = (url: string) => {
    window.location.href = url;
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
            className="relative h-[2.625rem] w-[2.625rem] rounded-full bg-white"
            onClick={() => handleLogin(googleLink)}
          >
            <div className="absolute left-1/2 top-1/2 h-[1.375rem] w-[1.375rem] -translate-x-1/2 -translate-y-1/2 transform">
              <Image
                className="h-full w-full object-cover"
                src="/icons/google.png"
                alt="google"
                width={22}
                height={22}
              />
            </div>
          </button>

          <button
            className="relative h-[2.625rem] w-[2.625rem] rounded-full bg-[#F1E148]"
            onClick={() => handleLogin(kakaoLink)}
          >
            <div className="absolute left-1/2 top-1/2 h-[1.375rem] w-[1.625rem] -translate-x-1/2 -translate-y-1/2 transform">
              <Image
                className="h-full w-full object-cover"
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
