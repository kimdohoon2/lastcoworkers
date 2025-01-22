export default function LandingFooter() {
  return (
    <div className="bg-landing-bottom-small tablet:bg-landing-bottom-medium xl:bg-landing-bottom-large mt-14 flex h-[40rem] w-full flex-col items-center bg-center bg-no-repeat tablet:h-[58.75rem] xl:h-[67.5rem]">
      <div className="flex flex-col items-center gap-4 tablet:gap-6">
        <div className="mt-[5.25rem] flex gap-6">
          <span className="text-2xl font-semibold text-text-primary tablet:text-4xl xl:text-5xl">
            지금 바로 시작해보세요
          </span>
        </div>
        <div className="text-center text-base font-medium text-text-primary tablet:text-2xl">
          팀원 모두와 같은 방향,<span className="block tablet:inline"></span>{' '}
          같은 속도로 나아가는 가장 쉬운 방법
        </div>
      </div>
    </div>
  );
}
