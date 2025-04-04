'use client';

import logo from './../app/favicon.ico';
import moon from './../images/icon-moon.svg';
import sun from './../images/icon-sun.svg';
import Image from 'next/image';
import { useThemeStore } from './store/useThemeStore';

const Header = () => {
  const { theme } = useThemeStore();

  return (
    <header
      className={`z-10 relative p-48P pb-144P
    ${theme === 'theme1' ? 'bg-cyanDark' : 'bg-cyanLight'}
    `}
    >
      <div className={`flex justify-around items-center text-center`}>
        <Image src={logo} className="w-64W" alt="triangle" />
        <h1 className="text-2xl font-bold tracking-wide uppercase">
          Strength isn't just physical — it's in every decision to keep going.
        </h1>

        <Image src={sun} className="w-64W" alt="sun" />
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
