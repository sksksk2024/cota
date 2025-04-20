'use client';

import { motion } from 'framer-motion';
import {
  buttonVariants,
  moonVariants,
  sunVariants,
} from '@/components/motionVariants/motionVariants';
import Image from 'next/image';
import logo from './favicon.ico';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Sun from '@/components/utils/Sun';
import Moon from '@/components/utils/Moon';
import Link from 'next/link';

const notFound = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <main
      className={`overflow-y-clip h-[100dvh] ${
        theme === 'theme1'
          ? 'text-white bg-deep-dark'
          : 'text-background-dark bg-green-cyan-light'
      }`}
    >
      <section
        className={`flex flex-col justify-center items-center gap-10 text-center p-16P py-32P pb-144P bg-cyanDark md:justify-around md:flex-row md:p-48P`}
      >
        <div className="group flex justify-around items-center w-full md:w-auto">
          <Image
            src={logo}
            className="w-64W  min-w-container-48"
            alt="triangle"
          />
          {theme === 'theme1' ? (
            <motion.div
              variants={sunVariants}
              initial="initial"
              whileHover="hover"
            >
              <Sun
                onClick={toggleTheme}
                className="min-w-container-48 w-64W h-64H cursor-pointer fill-white text-white hover:text-warning hover:fill-warning transition-colors duration-300 md:hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              variants={moonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Moon
                onClick={toggleTheme}
                className="min-w-container-48 w-64W h-64H cursor-pointer fill-textis hover:fill-highlight transition-colors duration-300 md:hidden"
              />
            </motion.div>
          )}
        </div>
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          Not all who wander are lost.
        </h1>

        {theme === 'theme1' ? (
          <motion.div
            variants={sunVariants}
            initial="initial"
            whileHover="hover"
          >
            <Sun
              onClick={toggleTheme}
              className="hidden min-w-container-48 w-64W h-64H cursor-pointer fill-white text-white hover:text-warning hover:fill-warning transition-colors duration-300 md:block"
            />
          </motion.div>
        ) : (
          <motion.div
            variants={moonVariants}
            initial="initial"
            whileHover="hover"
          >
            <Moon
              onClick={toggleTheme}
              className="hidden min-w-container-48 w-64W h-64H cursor-pointer fill-textis hover:fill-highlight transition-colors duration-300 md:block"
            />
          </motion.div>
        )}
      </section>
      <section
        className={`relative flex flex-col justify-start items-center gap-10 p-112P text-2xl text-center font-bold h-3/4
          
          `}
      >
        <h1>Looks like you've hit a dead end! This page doesn't exist.</h1>

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

        <Image
          src={logo}
          className="absolute -bottom-256I w-400W"
          alt="me building"
        />
      </section>
    </main>
  );
};

export default notFound;
