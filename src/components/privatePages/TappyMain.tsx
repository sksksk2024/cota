'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '../motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const TappyMain = () => {
  const { theme } = useThemeStore();

  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timer > 0) {
      interval = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(interval);
  }, [isActive, timer]);

  const handleScore = () => {
    if (timer > 0) {
      setIsActive(true);
      setScore((prev) => prev + 1);
    }
  };

  const handleStart = () => {
    setScore(0); // Eeset score on new game
    setTimer(10); // Reset timer
    setIsActive(true); // Start game
  };

  return (
    <div
      className={`w-full min-h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-16P py-48P md:px-64P
    ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
  `}
    >
      <header className="flex flex-col justify-center items-center gap-4 text-white max-w-container-600">
        <h1 className="text-xl font-bold text-center">
          Welcome to Tappy! See this button? Click it as many times as you can
          in 10 seconds.
        </h1>
        <div className="text-lg">Score: {score}</div>
        <div className="text-lg">Time left: {timer}s</div>
      </header>

      <main className="flex justify-center items-center gap-5 max-w-container-300">
        {timer > 0 ? (
          <button
            className={`text-center cursor-pointer p-16P rounded-5BR font-bold tracking-wide w-300W
          ${
            theme === 'theme1'
              ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
              : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
          }
          `}
            onClick={handleScore}
          >
            Click Me!
          </button>
        ) : (
          <button
            className={`text-center p-16P rounded-5BR font-bold tracking-wide w-300W
          ${
            theme === 'theme1'
              ? 'text-white bg-green-dark'
              : ' bg-green-light text-background-dark'
          }
          ${timer === 0 && theme === 'theme1' ? 'hover:text-background-dark hover:bg-warning' : timer === 0 && theme === 'theme2' && 'hover:text-cyan-dark hover:bg-highlight'}
          ${timer === 0 && 'cursor-pointer'}
          `}
            onClick={handleStart}
          >
            Start
          </button>
        )}
      </main>

      <footer className="flex justify-center items-center w-full">
        {/* GO BACK TO GAMES */}
        <motion.button
          className={`cursor-pointer p-16P rounded-5BR font-bold tracking-wide w-300W
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <Link href="/games" passHref>
            Go To Games
          </Link>
        </motion.button>
      </footer>
    </div>
  );
};

export default TappyMain;
