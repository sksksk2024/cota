'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import goalsMe from '@/images/goalsMe.webp';
import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import { comingMeVariants } from './motionVariants/motionVariants';
import { useTranslation } from './hooks/useTranslation';

const Goals = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  return (
    <PageWrapper>
      <div className="flex flex-col justify-around items-center xl:flex-row">
        <div
          className={`flex flex-col justify-start items-start gap-10 px-32P xl:px-0 xl:max-w-1/2
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          <div className="z-50 space-y-5">
            <h2
              className={`text-2xl text-center font-bold xl:text-start
            `}
            >
              {t('goals.title')}
            </h2>
            <div className="font-semibold tracking-widest">
              {t('goals.intro')}
              <ul className="list-disc list-inside space-y-2">
                {t('goals.goals').map((goal: string, index: number) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
              <div className="my-32M">
                {t('goals.transition1')}{' '}
                <span className="italic">{t('goals.action')}</span>.{' '}
                {t('goals.transition2')}
              </div>
              <ul className="list-disc list-inside space-y-2">
                {t('goals.currentActions').map(
                  (goal: string, index: number) => (
                    <li key={index}>{goal}</li>
                  )
                )}
              </ul>
              {t('goals.conclusion')}
            </div>
          </div>
          <div className="z-50 space-y-5">
            <h2
              className={`text-2xl text-center font-bold xl:text-start
            `}
            >
              {t('goals.qualities.title')}
            </h2>
            <p className="font-semibold tracking-widest">
              {t('goals.qualities.description1')}{' '}
              <span className="italic">{t('goals.qualities.challange')}</span>
              {t('goals.qualities.description2')}
            </p>
          </div>
        </div>
        <motion.div
          variants={comingMeVariants}
          initial="hidden"
          animate="visible"
          className="md:w-[700px] xl:w-full xl:max-w-container-700 absolute -bottom-32I xl:right-0"
        >
          <Image
            src={goalsMe}
            className="w-full pointer-events-none"
            alt="aboutMe"
          />
        </motion.div>
        <div className="w-128W h-1"></div>
      </div>
    </PageWrapper>
  );
};

export default Goals;
