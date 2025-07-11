'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useUser } from '@/components/hooks/useUser';
import { useSession } from 'next-auth/react';

import Header from '@/components/Header';
import TermsAndServices from '../TermsAndServices';
const Guide = lazy(() => import('@/components/Guide'));
const Working = lazy(() => import('@/components/Working'));
const Info = lazy(() => import('@/components/Info'));
const CotaLogo = lazy(() => import('../svgs/CotaLogo'));

const HomeMain = () => {
  const [, setIsLoading] = useState(true);
  const { theme } = useThemeStore();
  const { user } = useUser();

  const { data: session, status } = useSession();

  // Simulate transition effect once session is loaded
  useEffect(() => {
    if (status !== 'loading') {
      const timeout = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const displayName = session?.user?.name || user?.id;

  return (
    <main className="relative w-full h-full">
      {/* App Content */}
      <div className="relative">
        {/* Object to fill in the gaps */}
        <div
          className={`relative -top-96I
          ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
          `}
        >
          <Suspense fallback={null}>
            <Guide />
          </Suspense>

          <Header />

          <Suspense fallback={null}>
            <Working />
          </Suspense>
          {/* Bottom gradient background for header effect */}
          <div
            className={`z-0 relative bottom-80I h-auto w-full backdrop-blur-md -mb-160M
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-deep-dark'}
          `}
          >
            <Suspense fallback={null}>
              <Info />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={null}>
          {!displayName ? (
            <div
              className={`z-0 absolute -bottom-208I flex justify-center items-center h-300H md:-bottom-96I md:h-192H w-full
              ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
              `}
            >
              <div className="flex flex-col justify-center items-center relative bottom-80I w-288W">
                <TermsAndServices />
                <CotaLogo />
              </div>
            </div>
          ) : (
            <div
              className={`z-0 absolute -bottom-320I flex justify-center items-center h-300H md:-bottom-96I md:h-192H w-full lg:-bottom-320I
              ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
              `}
            >
              <div className="flex flex-col justify-center items-center relative bottom-96I w-288W xs:bottom-288I md:bottom-0 lg:bottom-240I">
                <TermsAndServices />
                <CotaLogo />
              </div>
            </div>
          )}
        </Suspense>
      </div>
      <div
        className={`z-0 relative bottom-80I h-auto w-full backdrop-blur-md -mb-160M
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-deep-dark'}
          `}
      ></div>
    </main>
  );
};

export default HomeMain;
