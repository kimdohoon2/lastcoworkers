import Image from 'next/image';

export default function QuickLogin() {
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
          <button className="relative h-[2.625rem] w-[2.625rem] rounded-full bg-white">
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

          <button className="relative h-[2.625rem] w-[2.625rem] rounded-full bg-[#F1E148]">
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
