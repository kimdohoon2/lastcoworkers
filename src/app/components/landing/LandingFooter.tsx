'use client';

import { motion } from 'framer-motion';

export default function LandingFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="bg-landing-bottom-small tablet:bg-landing-bottom-medium xl:bg-landing-bottom-large flex h-[40rem] w-full flex-col items-center bg-center bg-no-repeat tablet:h-[58.75rem] xl:h-[67.5rem]"
    >
      <div className="mt-[7.6875rem] flex flex-col items-center gap-4 tablet:mt-44 tablet:gap-6 xl:mt-[8.125rem]">
        <div className="flex gap-6">
          <span className="text-2xl font-semibold text-text-primary tablet:text-4xl">
            지금 바로 시작해보세요
          </span>
        </div>
        <div className="text-center text-base font-medium text-text-primary tablet:text-2xl">
          팀원 모두와 같은 방향,
          <span className="block tablet:inline" />
          같은 속도로 나아가는 가장 쉬운 방법
        </div>
      </div>
    </motion.div>
  );
}
