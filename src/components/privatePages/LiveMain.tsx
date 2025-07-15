'use client';

import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import ProtectedPageAll from '@/components/ProtectedPageAll';
import Link from 'next/link';
import React, { useState } from 'react';
import { Locked } from '@/components/svgs/Locked';

const TutorialsMain = () => {
  const { theme } = useThemeStore();

  const [isLive] = useState<boolean>(true);

  return (
    <ProtectedPageAll>
      <main
        className={`w-full min-h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-16P py-48P md:px-64P
          ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
        `}
      >
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
          `}
        >
          Live Page -{' '}
          {!isLive ? (
            <span
              className={`${theme === 'theme1' ? 'text-warning' : 'text-highlight'}`}
            >
              Not Live
            </span>
          ) : (
            <span
              className={`${theme === 'theme1' ? 'text-warning' : 'text-highlight'}`}
            >
              Live Now
            </span>
          )}
        </h1>

        {/* Live Section */}
        <section className="min-w-container-300 w-full max-w-container-1440 hover:scale-[0.99]">
          {!isLive ? (
            <div
              className={`w-full h-800H flex justify-center items-center
                ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}
            `}
            >
              <Locked className="w-1/2" />
            </div>
          ) : (
            <div className="w-full h-800H flex justify-center">
              <ReactPlayer
                url="https://www.youtube.com/shorts/n0aMbpre_Bs"
                width="100%"
                height="100%"
                controls={true}
                light
              />
            </div>
          )}
        </section>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          animate="exit"
          className={`w-full min-w-container-300 max-w-container-600 cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
          `}
        >
          <Link href="/" passHref>
            Go Home
          </Link>
        </motion.button>
      </main>
    </ProtectedPageAll>
  );
};

export default TutorialsMain;
