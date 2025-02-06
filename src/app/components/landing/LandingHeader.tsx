'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/stores/store';
import IconRepair from '@/app/components/icons/IconRepair';
import getUser from '@/app/lib/user/getUser';
import { motion } from 'framer-motion';

export default function LandingHeader() {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const handleStartClick = async () => {
    if (!accessToken) {
      router.push('/login');
      return;
    }

    try {
      const userData = await getUser();
      if (!userData || userData.memberships.length === 0) {
        router.push('/noteam');
      } else {
        const latestGroup =
          userData.memberships[userData.memberships.length - 1].group;
        router.push(`/${latestGroup.id}`);
      }
    } catch (error) {
      router.push('/login');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-14 flex h-[40rem] w-full flex-col items-center justify-between pb-8 tablet:h-[58.75rem] tablet:pb-[10.5rem] xl:h-[67.5rem] xl:pb-[11.25rem]"
    >
      <div className="bg-landing-top-small tablet:bg-landing-top-medium xl:bg-landing-top-large h-full w-full bg-cover bg-center bg-no-repeat">
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
      <button
        onClick={handleStartClick}
        className="cursor-pointer rounded-[2rem] bg-gradient-to-r from-brand-primary to-brand-tertiary px-[8.9375rem] py-3 text-base font-semibold text-white"
      >
        지금 시작하기
      </button>
    </motion.div>
  );
}
