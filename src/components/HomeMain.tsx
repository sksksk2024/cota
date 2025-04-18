'use client';

import logo from './../app/favicon.ico';
import Info from '@/components/Info';
import Header from '@/components/Header';
import Working from '@/components/Working';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Guide from '@/components/Guide';
import Image from 'next/image';
import { useUser } from '@/components/hooks/useUser';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';
import { div } from 'framer-motion/client';

const HomeMain = () => {
  const { theme } = useThemeStore();
  const user = useUser();

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div
        className={`w-full h-[100dvh] flex justify-center items-center m-auto
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
      `}
      >
        <Spinner />
      </div>
    );
  }

  const displayName = session?.user ?? user;

  return (
    <>
      <div className="relative">
        {/* Object to fill in the gaps */}
        <div
          className={`relative -top-96I
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
        `}
        >
          <Guide />
          <Header />
          <Working />
          {/* Bottom gradient background for header effect */}
          <div
            className={`z-0 relative bottom-80I h-auto w-full backdrop-blur-md -mb-160M
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-deep-dark'}
          `}
          >
            <Info />
          </div>
        </div>
        {!displayName ? (
          <div
            className={`z-0 absolute -bottom-208I flex justify-center items-center h-300H md:-bottom-96I md:h-192H w-full
              ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
              `}
          >
            <Image
              src={logo}
              className="relative bottom-80I w-96W md:w-144W"
              alt="logo"
            />
          </div>
        ) : (
          <div
            className={`z-0 absolute -bottom-320I flex justify-center items-center h-300H md:-bottom-96I md:h-192H w-full lg:-bottom-320I
              ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
              `}
          >
            <Image
              src={logo}
              className="relative w-144W bottom-96I xs:bottom-288I md:bottom-0 lg:bottom-240I"
              alt="logo"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HomeMain;
