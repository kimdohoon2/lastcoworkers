'use client';

import Image from 'next/image';
import IconMessage from '@/app/components/icons/IconMessage';
import IconFolder from '@/app/components/icons/IconFolder';
import IconDone from '@/app/components/icons/IconDone';
import { motion } from 'framer-motion';

export default function LandingFeatures() {
  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-col gap-6 xl:gap-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        variants={leftVariant}
        className="mx-auto h-[29.1875rem] w-[21.4375rem] flex-col rounded-[2.5rem] bg-gradient-to-r from-brand-primary to-[#CEF57E] p-[0.0625rem] shadow-custom tablet:h-[22.125rem] tablet:w-[43.5rem] xl:h-[26.1875rem] xl:w-[62.25rem]"
      >
        <div className="flex h-full w-full flex-wrap-reverse items-start rounded-[2.5rem] bg-background-primary pl-[3.125rem] tablet:justify-center tablet:gap-[8.75rem] tablet:pl-0 xl:gap-[12.0625rem]">
          <Image
            src="/contents/landing-section1.png"
            alt="랜딩 페이지 이미지1"
            width={235}
            height={273}
            className="xl:h-[21.125rem] xl:w-[18.1875rem]"
          />
          <div className="flex flex-col gap-4 tablet:my-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F8FAFC1a] bg-background-secondary">
              <IconFolder />
            </div>
            <p className="flex items-center text-2lg font-medium text-white">
              그룹으로 <br />할 일을 관리해요
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        variants={rightVariant}
        className="mx-auto flex h-[29.1875rem] w-[21.4375rem] flex-col gap-10 rounded-[2.5rem] border border-[#F8FAFC1a] bg-background-secondary pl-[3.125rem] tablet:h-[22.125rem] tablet:w-[43.5rem] tablet:flex-row-reverse tablet:items-start tablet:justify-center tablet:gap-[8.75rem] tablet:pl-0 xl:h-[26.1875rem] xl:w-[62.25rem] xl:gap-[12.0625rem]"
      >
        <Image
          src="/contents/landing-section2.png"
          alt="랜딩 페이지 이미지2"
          width={235}
          height={273}
          className="xl:h-[21.125rem] xl:w-[18.1875rem]"
        />
        <div className="my-auto flex flex-col gap-4 tablet:items-end">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F8FAFC1a] bg-background-secondary">
            <IconMessage />
          </div>
          <p className="flex items-center text-2lg font-medium text-white tablet:text-right">
            간단하게 멤버들을 <br />
            초대하세요
          </p>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        variants={leftVariant}
        className="mx-auto flex h-[29.1875rem] w-[21.4375rem] flex-col gap-10 rounded-[2.5rem] bg-state-950 pl-[3.125rem] tablet:h-[22.125rem] tablet:w-[43.5rem] tablet:flex-row tablet:items-start tablet:justify-center tablet:gap-[8.75rem] xl:h-[26.1875rem] xl:w-[62.25rem] xl:gap-[12.0625rem]"
      >
        <Image
          src="/contents/landing-section3.png"
          alt="랜딩 페이지 이미지3"
          width={235}
          height={273}
          className="xl:h-[21.125rem] xl:w-[18.1875rem]"
        />
        <div className="flex flex-col gap-4 tablet:my-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F8FAFC1a] bg-background-secondary">
            <IconDone />
          </div>
          <p className="flex items-center text-2lg font-medium text-white">
            할 일도 간편하게
            <br />
            체크해요
          </p>
        </div>
      </motion.div>
    </div>
  );
}
