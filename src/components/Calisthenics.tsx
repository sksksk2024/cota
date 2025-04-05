'use client';

import Image from 'next/image';
import logo from './../app/favicon.ico';
import { useThemeStore } from './store/useThemeStore';

const Calithenics = () => {
  const { theme } = useThemeStore();

  return (
    <>
      <div
        className={`z-50 relative flex justify-center items-center w-full
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
        <Image
          src={logo}
          className="z-20 absolute translate-x-1/2 right-1/2 w-1/4"
          alt="me working"
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
      </div>
      {/* Bottom solid background for header effect */}
      <div
        className={`z-[999] relative bottom-0 h-800H z-0
    ${theme === 'theme1' ? 'bg-cyan-dark' : 'bg-cyan-dark'}
    `}
      />
    </>
  );
};

export default Calithenics;
