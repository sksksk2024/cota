'use client';

import { useState } from 'react';
import logo from './../app/favicon.ico';
import Info from '@/components/Info';
import Header from '@/components/Header';
import Working from '@/components/Working';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Guide from '@/components/Guide';
import Image from 'next/image';

const Home = () => {
  const { theme } = useThemeStore();
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

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
        {!isSignedUp ? (
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

export default Home;
