'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import Link from 'next/link';
import CotaLogo from '@/components/svgs/CotaLogo';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useTranslation } from '@/components/hooks/useTranslation';

const NotFound = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  return (
    <main
      className={`overflow-y-clip min-h-[100dvh] flex flex-col justify-start items-center ${
        theme === 'theme1'
          ? 'text-white bg-deep-dark'
          : 'text-background-dark bg-green-cyan-light'
      }`}
    >
      <section
        className={`z-50 flex flex-col justify-center items-center gap-10 text-center p-16P py-32P pb-144P bg-cyanDark md:justify-around md:flex-row md:p-48P`}
      >
        <div className="group flex justify-around items-center w-full md:w-auto">
          <div className="w-64W  min-w-container-48">
            <CotaLogo />
          </div>
        </div>
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          {t('terms.title')}
        </h1>
      </section>
      <section
        className={`relative flex flex-col justify-start items-center gap-10 px-32P pb-112P text-2xl text-center font-bold h-3/4
          
          `}
      >
        {/* Terms */}
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">{t('terms.mini1')}</h1>
          <p className="text-md mb-4">
            {t('terms.updated')}
            {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2 xl:text-xl">
            {t('terms.mini2')}
          </h2>
          <p className="text-md">{t('terms.desc1')}</p>

          <h2 className="text-lg font-semibold mt-6 mb-2 xl:text-xl">
            {t('terms.mini3')}
          </h2>
          <p className="text-md">{t('terms.desc2')}</p>

          <h2 className="text-lg font-semibold mt-6 mb-2 xl:text-xl">
            {t('terms.mini4')}
          </h2>
          <p className="text-md">
            {t('terms.desc3')}
            <a
              href="mailto:cota8091@gmail.com"
              className={`underline
              ${theme === 'theme1' ? 'hover:text-warning' : 'hover:text-highlight'}
              `}
            >
              cota8091@gmail.com
            </a>
          </p>
        </div>

        {/* HOME LINK */}
        <motion.button
          className={`z-50 w-full min-w-container-300 max-w-container-600 text-center text-md cursor-pointer p-16P rounded-5BR font-bold tracking-wide
        ${
          theme === 'theme1'
            ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
            : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
        }
        `}
          variants={buttonVariants}
          initial="hidden"
          whileHover="hover"
          animate="exit"
          drag
          dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
          dragElastic={0.7}
        >
          <Link href="/" passHref>
            {t('terms.home')}
          </Link>
        </motion.button>
      </section>
    </main>
  );
};

export default NotFound;
