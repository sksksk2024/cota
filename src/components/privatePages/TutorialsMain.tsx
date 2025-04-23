'use client';

import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import ProtectedPageAll from '@/components/ProtectedPageAll';
import Link from 'next/link';
import React from 'react';
import { Locked } from '@/components/svgs/Locked';
import { tutorials } from '@/components/jsonFiles/tutorials';

const TutorialsMain = () => {
  const { theme } = useThemeStore();

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
          Tutorials Page
        </h1>

        {/* Tutorials Grid */}
        <section className="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-20 place-items-center place-content-center max-w-container-1440">
          {tutorials.map((tutorial, index) => (
            <div
              key={index}
              className="min-w-container-300 max-w-container-300 h-300H hover:scale-[0.99]"
            >
              {tutorial.locked ? (
                <div
                  className={`w-full h-full flex justify-center items-center 
                  ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}
                `}
                >
                  <Locked className="w-full" />
                </div>
              ) : (
                <ReactPlayer
                  url={tutorial.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  light
                />
              )}
            </div>
          ))}
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
