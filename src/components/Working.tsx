'use client';

import { motion } from 'framer-motion';
import { comingVariants } from './motionVariants/motionVariants';
import Image from 'next/image';
import workingMe from '@/images/workingMe.webp';
import { useThemeStore } from './hooks/useThemeStore';

const Working = () => {
  const { theme } = useThemeStore();

  return (
    <>
      <div
        className={`z-40 relative w-full flex justify-center items-center
    `}
      >
        {/* Top solid background for header effect */}
        <div
          className={`absolute inset-0 h-1/2 z-0
    ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
    `}
        />
        <div
          className={`z-10 relative rounded-full h-800H w-800W
        ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
        `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <motion.span
          variants={comingVariants}
          initial="hidden"
          whileInView="visible"
          className="z-20 absolute translate-x-1/2 right-1/2 w-full max-w-[700px] h-[700px]"
        >
          <Image
            priority
            fetchPriority="high"
            src={workingMe}
            className="z-20 absolute translate-x-1/2 right-1/2 w-[700px] h-[700px] opacity-30 object-contain pointer-events-none"
            alt="me working"
          />
        </motion.span>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
        <div
          className={`z-10 relative rounded-full h-800H w-800W
          ${theme === 'theme1' ? 'bg-green-dark' : 'bg-green-light'}
          `}
        ></div>
      </div>
      {/* Parking Spot for Sticky Nav */}
      <div
        id="about"
        className={`relative -top-80I h-1
        `}
      ></div>
    </>
  );
};

export default Working;
