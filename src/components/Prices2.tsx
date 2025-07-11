'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import aboutMe from '@/images/aboutMe.webp';
import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import { comingMeVariants } from './motionVariants/motionVariants';
import Cards from './Cards';
import { oneOne, ourCommunity, remote } from './utils/AllPrices';

const Prices2 = () => {
  const { theme } = useThemeStore();

  return (
    <PageWrapper>
      <h2
        className={`
            ${theme === 'theme1' ? 'text-highlight' : 'text-textis'}
            w-full text-2xl text-center font-bold mx-auto py-32P mt-48M 2xl:text-start`}
      >
        Become a Pro Calisthenics Athlete
      </h2>
      {/* TABEL PRETURI */}
      <div className="z-50 relative w-full flex flex-col 2xl:flex-row overflow-y-clip mx-auto py-[1.4rem]">
        <Cards data={remote} />
        <Cards data={ourCommunity} />
        <Cards data={oneOne} />
      </div>
    </PageWrapper>
  );
};

export default Prices2;
