'use client';

import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import Cards from './Cards';
import { useTranslation } from './hooks/useTranslation';

const Prices3 = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const mentoring = [
    {
      title: t('mentoring.title'),
      desc: t('mentoring.desc'),
      info1: t('mentoring.info1'),
      info2: t('mentoring.info2'),
      info3: t('mentoring.info3'),
      info4: 100,
      info5: t('mentoring.info5'),
    },
  ];

  return (
    <PageWrapper>
      <h2
        className={`
          ${theme === 'theme1' ? 'text-highlight' : 'text-textis'}
          w-full text-2xl text-center font-bold mx-auto mt-48M py-32P 2xl:text-start`}
      >
        {t('sectionTitles.title3')}
      </h2>
      {/* TABEL PRETURI */}
      <div className="z-50 relative w-full flex flex-col 2xl:flex-row overflow-y-clip mx-auto py-[1.4rem]">
        <Cards data={mentoring} />
      </div>
    </PageWrapper>
  );
};

export default Prices3;
