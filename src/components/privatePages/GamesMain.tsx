'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import ProtectedPageAll from '@/components/ProtectedPageAll';
import Link from 'next/link';
import React from 'react';
import { TappyIcon } from '../svgs/TappyIcon';
import MazeIcon from '../svgs/MazeIcon';
import StackAttackIcon from '../svgs/StackAttackIcon';
import { useTranslation } from '../hooks/useTranslation';

const GamesMain = () => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

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
          {t('games.title')}
        </h1>

        {/* Games Grid */}
        <section className="grid xs:grid-cols-1 lg:grid-cols-3 gap-20 place-items-center place-content-center max-w-container-1440">
          {/* TAPPY */}
          <Link
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H bg-gray-500 cursor-pointer rounded-xl shadow-lg  transition-shadow hover:scale-[0.99]
              ${theme === 'theme1' ? 'hover:shadow-cyan-400/20' : 'hover:shadow-cyan-800/90'}
              `}
            href={'/games/tappy'}
          >
            <div className="w-1/2 p-16P">
              <TappyIcon />
            </div>
            <div
              className={`flex justify-center items-center w-full h-full p-16P  tracking-widest
              ${theme === 'theme1' ? 'bg-textis text-white' : 'bg-white text-textis'}
              `}
            >
              <h2 className="text-lg font-bold mx-auto">Tappy</h2>
            </div>
          </Link>

          {/* STACK ATTACK */}
          <Link
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H bg-gray-500 cursor-pointer rounded-xl shadow-lg  transition-shadow hover:scale-[0.99]
              ${theme === 'theme1' ? 'hover:shadow-cyan-400/20' : 'hover:shadow-cyan-800/90'}
              `}
            href={'/games/stackattack'}
          >
            <div className="w-1/2 p-16P">
              <StackAttackIcon />
            </div>
            <div
              className={`flex justify-center items-center w-full h-full p-16P  tracking-widest
              ${theme === 'theme1' ? 'bg-textis text-white' : 'bg-white text-textis'}
              `}
            >
              <h2 className="text-lg font-bold mx-auto">Stack Attack</h2>
            </div>
          </Link>

          {/* MAZE */}
          <Link
            className={`flex flex-col justify-start items-center min-w-container-300 w-full max-w-container-300 h-300H bg-gray-500 cursor-pointer rounded-xl shadow-lg  transition-shadow hover:scale-[0.99]
              ${theme === 'theme1' ? 'hover:shadow-cyan-400/20' : 'hover:shadow-cyan-800/90'}
              `}
            href={'/games/maze'}
          >
            <div className="w-1/2 p-16P">
              <MazeIcon />
            </div>
            <div
              className={`flex justify-center items-center w-full h-full p-16P  tracking-widest
              ${theme === 'theme1' ? 'bg-textis text-white' : 'bg-white text-textis'}
              `}
            >
              <h2 className="text-lg font-bold mx-auto">Maze</h2>
            </div>
          </Link>
        </section>

        {/* LEADERBOARD */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          className={`w-full min-w-container-300 max-w-container-600 cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
          `}
          animate="exit"
        >
          <Link href="/leaderboard" passHref>
            {t('games.leaderboard')}
          </Link>
        </motion.button>

        {/* HOME */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          className={`w-full min-w-container-300 max-w-container-600 cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
          `}
          animate="exit"
        >
          <Link href="/" passHref>
            {t('games.home')}
          </Link>
        </motion.button>
      </main>
    </ProtectedPageAll>
  );
};

export default GamesMain;
