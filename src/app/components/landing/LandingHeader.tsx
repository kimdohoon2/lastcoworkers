import IconRepair from '@/app/components/icons/IconRepair';
import Link from 'next/link';

export default function LandingHeader() {
  return (
    <div className="mt-14 flex h-[40rem] w-full flex-col items-center justify-between pb-8 tablet:h-[58.75rem] tablet:pb-[10.5rem] xl:h-[67.5rem] xl:pb-[11.25rem]">
      <div className="h-full w-full bg-landing-top-small bg-cover bg-center bg-no-repeat tablet:bg-landing-top-medium xl:bg-landing-top-large">
        <div className="flex flex-col items-center gap-1 tablet:gap-2 xl:gap-5">
          <div className="mt-[5.25rem] flex items-center gap-1 tablet:gap-4 xl:gap-6">
            <span className="text-2xl font-semibold text-text-primary tablet:text-4xl xl:text-5xl">
              함께 만들어가는 투두 리스트
            </span>
            <IconRepair />
          </div>
          <div className="inline-block bg-gradient-to-r from-brand-gradient-from to-brand-gradient-to bg-clip-text text-2xl font-semibold text-transparent tablet:text-5xl xl:text-[4rem]">
            Coworkers
          </div>
        </div>
      </div>
      <Link
        href="/login"
        className="cursor-pointer rounded-[2rem] bg-gradient-to-r from-brand-primary to-brand-tertiary px-[8.9375rem] py-3 text-base font-semibold text-white"
      >
        지금 시작하기
      </Link>
    </div>
  );
}
