import IconRepair from '@/app/components/icons/IconRepair';
import Image from 'next/image';
import LandingSection1 from '@public/contents/landging-section1.png';
import IconLandingFolder from '@/app/components/icons/IconLandingFolder';

export default function LandingPage() {
  return (
    <div>
      <div className="bg-landing-top-large mt-14 flex h-[67.5rem] w-full flex-col items-center justify-between pb-8">
        <div className="flex flex-col items-center gap-5">
          <div className="mt-[5.25rem] flex gap-6">
            <span className="text-5xl font-semibold text-text-primary">
              함께 만들어가는 투두 리스트
            </span>
            <IconRepair />
          </div>
          <div className="inline-block bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-[4rem] font-semibold text-transparent">
            Coworkers
          </div>
        </div>
        <button className="cursor-pointer rounded-[2rem] bg-gradient-to-r from-brand-primary to-brand-tertiary px-36 py-3 text-base font-semibold text-white">
          지금 시작하기
        </button>
      </div>
      <div className="shadow-custom mx-auto h-[467px] w-[343px] flex-col rounded-[2.5rem] bg-gradient-to-r from-brand-primary to-[#CEF57E] p-[0.0625rem]">
        <div className="flex h-full w-full flex-wrap-reverse items-start rounded-[2.5rem] bg-background-primary pl-[3.125rem]">
          <Image
            src={LandingSection1}
            alt="랜딩 페이지 이미지1"
            width={235}
            height={273}
          />
          <div className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F8FAFC1a] bg-background-secondary">
              <IconLandingFolder />
            </div>
            <p className="flex items-center text-2lg font-medium text-white">
              그룹으로 <br />할 일을 관리해요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
