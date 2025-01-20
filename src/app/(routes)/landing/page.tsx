import { IconRepair } from '@/app/components/icons/IconRepair';

export default function LandingPage() {
  return (
    <div className="mt-36 flex flex-col items-center gap-5">
      <div className="flex gap-6">
        <span className="text-text-primary text-5xl font-semibold">
          함께 만들어가는 투두 리스트
        </span>
        <IconRepair />
      </div>
      <div className="from-brand-gradient-from to-brand-gradient-to inline-block bg-gradient-to-r bg-clip-text text-[4rem] font-semibold text-transparent">
        Coworkers
      </div>
    </div>
  );
}
