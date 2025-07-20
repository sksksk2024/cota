'use client';

import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import Cards from './Cards';
import { useTranslation } from './hooks/useTranslation';

const Prices1 = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const common = [
    {
      title: t('common.title'),
      desc: t('common.desc'),
      info1: t('common.info1'),
      info2: t('common.info2'),
      info3: 600,
    },
  ];

  const rare = [
    {
      title: t('rare.title'),
      desc: t('rare.desc'),
      info1: t('rare.info1'),
      info2: t('rare.info2'),
      info3: 1000,
    },
  ];

  const legendary = [
    {
      title: t('legendary.title'),
      desc: t('legendary.desc'),
      info1: t('legendary.info1'),
      info2: t('legendary.info2'),
      info3: 1500,
    },
  ];

  return (
    <PageWrapper>
      <h2
        className={`
          ${theme === 'theme1' ? 'text-highlight' : 'text-textis'}
          w-full text-2xl text-center font-bold mx-auto mt-48M py-32P 2xl:text-start`}
      >
        {t('sectionTitles.title1')}
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
