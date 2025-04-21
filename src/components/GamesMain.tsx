'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/components/hooks/useToast';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import ProtectedPageAll from '@/components/ProtectedPageAll';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Sun from './utils/Sun';
import { Locked } from '@/components/svgs/Locked';

const GamesMain = () => {
  const { theme } = useThemeStore();

  // TAPPING GAME
  return (
    <ProtectedPageAll>
      <main
        className={`w-full my-auto flex flex-col justify-center items-center gap-10 px-16P py-48P md:px-64P
          ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
        `}
      >
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
          `}
        >
          Games Page
        </h1>

        {/* Games Grid */}
        <section className="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-20 place-items-center place-content-center max-w-container-1440">
          <Link
            className="flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H bg-black cursor-pointer hover:scale-[0.99]"
            href={'/games'}
          >
            <div className="w-1/2">
              <Sun />
            </div>
            <div className="flex justify-center items-center w-full h-full p-16P bg-white tracking-widest">
              <h2 className="text-lg text-black font-bold mx-auto">Tappy</h2>
            </div>
          </Link>

          <div
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H 
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}`}
          >
            <div className="w-full h-200H">
              <Locked className="w-full" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H 
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}`}
          >
            <div className="w-full h-200H">
              <Locked className="w-full" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H  
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}`}
          >
            <div className="w-full h-200H">
              <Locked className="w-full" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H  
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}`}
          >
            <div className="w-full h-200H">
              <Locked className="w-full" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H  
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}`}
          >
            <div className="w-full h-200H">
              <Locked className="w-full" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H 
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}`}
          >
            <div className="w-full h-200H">
              <Locked className="w-full" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H  
            ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}`}
          >
            <div className="w-full h-200H">
              <Locked className="w-full" />
            </div>
          </div>
        </section>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <Link
            className={`cursor-pointer px-16P py-8P rounded-5BR font-bold tracking-wide
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
            `}
            href="/"
            passHref
          >
            Go Home
          </Link>
        </motion.button>
      </main>
    </ProtectedPageAll>
  );
};

export default GamesMain;
