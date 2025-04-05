'use client';

import Image from 'next/image';
import logo from './../app/favicon.ico';
import { useThemeStore } from './store/useThemeStore';

const Working = () => {
  const { theme } = useThemeStore();

  return (
    <>
      <div
        className={`z-40 relative flex justify-center items-center
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
