'use client';

import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import Cards from './Cards';
import { useTranslation } from './hooks/useTranslation';

const Prices2 = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const ourCommunity = [
    {
      title: t('community.title'),
      desc: t('community.desc'),
      info1: t('community.info1'),
      info2: t('community.info2'),
      info3: t('community.info3'),
      info4: t('community.info4'),
      info5: t('community.info5'),
      info6: t('community.info6'),
    },
  ];

  const remote = [
    {
      title: t('remote.title'),
      desc: t('remote.desc'),
      info1: t('remote.info1'),
      info2: 150,
    },
  ];

  const oneOne = [
    {
      title: t('one.title'),
      desc: t('one.desc'),
      info1: t('one.info1'),
      info2: t('one.info2'),
      info3: 250,
    },
  ];

  return (
    <PageWrapper>
      <h2
        className={`
            ${theme === 'theme1' ? 'text-highlight' : 'text-textis'}
            w-full text-2xl text-center font-bold mx-auto py-32P mt-48M 2xl:text-start`}
      >
        {t('sectionTitles.title2')}
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
