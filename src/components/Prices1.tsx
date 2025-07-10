'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import aboutMe from '@/images/aboutMe.webp';
import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import Cards from './Cards';
import { common, legendary, rare } from './utils/AllPrices';

const Prices1 = () => {
  const { theme } = useThemeStore();

  return (
    <PageWrapper>
      <h2
        className={`
          ${theme === 'theme1' ? 'text-highlight' : 'text-textis'}
          w-full text-2xl text-center font-bold mx-auto 2xl:text-start
            py-32P`}
      >
        Website For Brands
      </h2>
      {/* TABEL PRETURI */}
      <div className="w-full flex flex-col 2xl:flex-row 3xs:gap-10 overflow-y-clip mx-auto">
        <Cards data={common} />
        <Cards data={rare} />
        <Cards data={legendary} />
      </div>
    </PageWrapper>
  );
};

export default Prices1;
