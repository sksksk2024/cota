'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import aboutMe from '@/images/aboutMe.webp';
import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import { comingMeVariants } from './motionVariants/motionVariants';
import Cards from './Cards';
import { mentoring } from './utils/AllPrices';

const Prices3 = () => {
  const { theme } = useThemeStore();

  return (
    <PageWrapper>
      <h2
        className={`
          ${theme === 'theme1' ? 'text-highlight' : 'text-textis'}
          w-full text-2xl text-center font-bold mx-auto 2xl:text-start
            py-32P`}
      >
        0 to Genius in:
      </h2>
      {/* TABEL PRETURI */}
      <div className="w-full flex flex-col 2xl:flex-row 3xs:gap-10 overflow-y-clip mx-auto">
        <Cards data={mentoring} />
      </div>
    </PageWrapper>
  );
};

export default Prices3;
