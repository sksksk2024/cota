'use client';

import Guide from '@/components/Guide';
import logo from './../app/favicon.ico';
import moon from './../images/icon-moon.svg';
import sun from './../images/icon-sun.svg';
import Image from 'next/image';
import { useThemeStore } from './hooks/useThemeStore';
import Sun from './utils/Sun';
import Moon from './utils/Moon';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header
      className={`z-10 relative
      ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
      `}
    >
      <div
        className={`flex flex-col justify-center items-center gap-10 text-center p-16P py-32P pb-144P bg-cyanDark md:justify-around md:flex-row md:p-48P`}
      >
        <div className="group flex justify-around items-center w-full md:w-auto">
          <Image
            src={logo}
            className="w-64W  min-w-container-48"
            alt="triangle"
          />
          {theme === 'theme1' ? (
            <Sun
              onClick={toggleTheme}
              className="min-w-container-48 w-64W h-64H cursor-pointer fill-white text-white hover:text-warning hover:fill-warning transition-colors duration-300 md:hidden"
            />
          ) : (
            <Moon
              onClick={toggleTheme}
              className="min-w-container-48 w-64W h-64H cursor-pointer fill-textis hover:fill-yellow-400 transition-colors duration-300 md:hidden"
            />
          )}
        </div>
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          Strength isn't just physical — it's in every decision to keep going.
        </h1>

        {theme === 'theme1' ? (
          <Sun
            onClick={toggleTheme}
            className="hidden min-w-container-48 w-64W h-64H cursor-pointer fill-white text-white hover:text-warning hover:fill-warning transition-colors duration-300 md:block"
          />
        ) : (
          <Moon
            onClick={toggleTheme}
            className="hidden min-w-container-48 w-64W h-64H cursor-pointer fill-textis hover:fill-yellow-400 transition-colors duration-300 md:block"
          />
        )}
      </div>
      <Image src={sun} className="z-30 w-64W relative mx-auto" alt="sun" />
    </header>
  );
};

export default Header;
