'use client';

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
          w-full text-2xl text-center font-bold mx-auto mt-48M py-32P 2xl:text-start`}
      >
        Website For Brands
      </h2>
      {/* TABEL PRETURI */}
      <div className="z-50 relative w-full flex flex-col 2xl:flex-row overflow-y-clip mx-auto py-[1.4rem]">
        <Cards data={common} />
        <Cards data={legendary} />
        <Cards data={rare} />
      </div>
    </PageWrapper>
  );
};

export default Prices1;
