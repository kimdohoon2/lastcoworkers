import IconRepair from '@/app/components/icons/IconRepair';

export default function LandingPage() {
  return (
    <div className="bg-landing-top-large mt-14 flex h-[67.5rem] w-full flex-col items-center justify-between">
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
    </div>
  );
}
