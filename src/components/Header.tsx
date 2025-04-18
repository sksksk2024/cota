'use client';

import { motion } from 'framer-motion';
import { sunVariants, moonVariants } from './motionVariants/motionVariants';
import logo from './../app/favicon.ico';
import Image from 'next/image';
import { useThemeStore } from './hooks/useThemeStore';
import Sun from './utils/Sun';
import Moon from './utils/Moon';
import { useUser } from './hooks/useUser';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useUser();

  const { data: session } = useSession();

  const displayName = session?.user?.name ?? user?.name;

  return (
    <header
      className={`z-10 relative
      `}
    >
      <div
        className={`relative z-50 flex flex-col justify-center items-center gap-10 text-center p-16P py-32P pb-144P bg-cyanDark md:justify-around md:flex-row md:p-48P`}
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
          {displayName ? (
            <>
              Welcome back,{' '}
              <span
                className={`
                ${theme === 'theme1' ? 'text-warning' : 'text-highlight'}
                `}
              >
                {displayName}
              </span>
              ! 🫡
            </>
          ) : (
            "Strength isn't just physical — it's in every decision to keep going."
          )}
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
      </div>
      <Sun className="z-30 w-64W relative mx-auto" />
    </header>
  );
};

export default Header;
