'use client';

import { motion } from 'framer-motion';
import { comingVariants } from './motionVariants/motionVariants';
import Image from 'next/image';
import presentationMe from '@/images/presentationMe.jpg';
import { useThemeStore } from './hooks/useThemeStore';

const Calisthenics = () => {
  const { theme } = useThemeStore();

  return (
    <>
      <div
        className={`z-40 relative flex justify-center items-center w-full
    `}
      >
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
          className="z-20 absolute translate-x-1/2 right-1/2 w-full max-w-[700px] h-[600px]"
        >
          <Image
            src={presentationMe}
            className="z-20 absolute translate-x-1/2 right-1/2 w-[700px] h-[600px] opacity-30 object-contain pointer-events-none"
            alt="me doing a handstand"
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
    </>
  );
};

export default Calisthenics;
