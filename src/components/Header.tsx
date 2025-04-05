'use client';

import Guide from '@/components/Guide';
import logo from './../app/favicon.ico';
import moon from './../images/icon-moon.svg';
import sun from './../images/icon-sun.svg';
import Image from 'next/image';
import { useThemeStore } from './store/useThemeStore';

const Header = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header
      className={`z-10 relative
      ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
      `}
    >
      <Guide />
      <div
        className={`flex justify-around items-center text-center p-48P pb-144P bg-cyanDark`}
      >
        <Image src={logo} className="w-64W" alt="triangle" />
        <h1
          className={`text-2xl font-bold tracking-wide uppercase
            ${theme === 'theme1' ? 'text-white' : 'text-white'}
            `}
        >
          Strength isn't just physical — it's in every decision to keep going.
        </h1>

        {theme === 'theme1' ? (
          <Image src={sun} onClick={toggleTheme} className="w-64W" alt="sun" />
        ) : (
          <Image
            src={moon}
            onClick={toggleTheme}
            className="w-64W"
            alt="moon"
          />
        )}
      </div>
      <Image
        src={sun}
        className="z-10 w-64W absolute bottom-32I right-1/2"
        alt="sun"
      />
    </header>
  );
};

export default Header;
