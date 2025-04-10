'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from './hooks/useThemeStore';
import BurgerMenu from './utils/BurgerMenu';
import XMenu from './utils/XMenu';

const Guide = () => {
  const { theme } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <>
      <div
        id="intro"
        className={`z-0 relative top-0 h-96H w-full
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
        `}
      />
      <ul
        className={`z-50 sticky top-0 flex justify-around items-center py-24P
    ${theme === 'theme1' ? 'bg-background-dark/50' : 'bg-cyan-dark/50'}
    `}
      >
        {openSideBar ? (
          <>
            <div onClick={handleToggleSideBar}>
              <XMenu />
            </div>
            {['Sign Up', 'Sign In', 'Sign Out', 'Edit Profile'].map((label) => (
              <li
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                className={`px-16P py-8P rounded-5BR cursor-pointer font-bold tracking-wide
          ${
            theme === 'theme1'
              ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
              : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
          }
          `}
              >
                {label}
              </li>
            ))}
          </>
        ) : (
          <>
            <div onClick={handleToggleSideBar}>
              <BurgerMenu />
            </div>
            {['Intro', 'About', 'Explore'].map((label) => (
              <li
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                className={`px-16P py-8P rounded-5BR cursor-pointer font-bold tracking-wide
          ${
            theme === 'theme1'
              ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
              : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
          }
          `}
              >
                {label}
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default Guide;
