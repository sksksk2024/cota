'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from './hooks/useThemeStore';
import BurgerMenu from './utils/BurgerMenu';
import XMenu from './utils/XMenu';
import Link from 'next/link';
import { useUser } from './hooks/useUser';
import SignOutButton from './SignOutButton';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';

const Guide = () => {
  const { theme } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);
  const user = useUser();

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div
        className={`w-full h-[100dvh] flex justify-center items-center m-auto
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
      `}
      >
        <Spinner />
      </div>
    );
  }

  const displayName = session?.user?.name ?? user?.name;

  // Map Logic to be more clean
  const navItems = ['Sign Up', 'Sign In', 'Sign Out', 'Edit Profile'];

  const getLinkPath = (label: string) =>
    `/${label.toLowerCase().replace(/\s+/g, '')}`;

  const isVisible = (label: string, user: any) => {
    if (user) return label !== 'Sign In' && label !== 'Sign Up';
    return label !== 'Sign Out' && label !== 'Edit Profile';
  };

  const liClasses = `rounded-5BR cursor-pointer font-bold tracking-wide ${
    theme === 'theme1'
      ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
      : 'bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
  }`;

  const contentClasses =
    'px-16P py-8P w-full h-full flex items-center justify-center cursor-pointer';

  // Sticky Navbar
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
            {navItems.map((label) =>
              isVisible(label, displayName) ? (
                <li className={liClasses} key={label}>
                  {displayName && label === 'Sign Out' ? (
                    <SignOutButton contentClasses={contentClasses} />
                  ) : (
                    <Link href={getLinkPath(label)} className={contentClasses}>
                      {label}
                    </Link>
                  )}
                </li>
              ) : null
            )}
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
