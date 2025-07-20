'use client';

import { motion } from 'framer-motion';
import { buttonVariants, ulVariants } from './motionVariants/motionVariants';
import React, { useEffect, useState } from 'react';
import { useThemeStore } from './hooks/useThemeStore';
import BurgerMenu from './utils/BurgerMenu';
import XMenu from './utils/XMenu';
import Link from 'next/link';
import { useUser } from './hooks/useUser';
import SignOutButton from './SignOutButton';
import { useSession } from 'next-auth/react';
import { useSound } from './hooks/useSound';
import { click, ding, woosh } from './sounds/sounds';
import { useLanguageStore } from './hooks/useLanguageStore';
import { useTranslation } from './hooks/useTranslation';

const Guide = () => {
  const { toggleLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const { play: playClick1 } = useSound(click, 0.02);
  const { play: playClick2 } = useSound(woosh, 0.8);
  const { play: playHover } = useSound(ding, 0.05);

  const { theme } = useThemeStore();
  const [, setScrolled] = useState(false);
  const { user } = useUser();

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const { data: session } = useSession();

  const displayName = session?.user?.name || user?.name;
  const currentUser = session?.user || user || null;

  // Map Logic to be more clean
  const navItems1 = [
    t('navigation.signUp'),
    t('navigation.signIn'),
    t('navigation.signOut'),
    t('navigation.editProfile'),
    t('navigation.languageToggle'),
  ];

  const navItems2 = [
    t('navigation.intro'),
    t('navigation.about'),
    t('navigation.explore'),
  ];

  const getLinkPath = (label: string) => {
    if (label === 'Iesi din Cont') {
      label = 'Sign Out';
    } else if (label === 'Editeaza-ti Contul') {
      label = 'Edit Profile';
    } else if (label === 'Inregistreaza-te') {
      label = 'Sign Up';
    } else {
      label = 'Sign In';
    }
    return `/${label.toLowerCase().replace(/\s+/g, '')}`;
  };

  const isVisible = (label: string, user: { id: unknown }) => {
    if (user?.id)
      return (
        label !== t('navigation.signIn') && label !== t('navigation.signUp')
      );
    return (
      label !== t('navigation.signOut') && label !== t('navigation.editProfile')
    );
  };

  const liClasses = `rounded-5BR cursor-pointer font-bold tracking-wide ${
    theme === 'theme1'
      ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
      : 'bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
  }`;

  const disabledClasses = `rounded-5BR cursor-not-allowed font-bold tracking-wide text-white bg-gray-500`;

  const contentDisabledClasses =
    'px-16P py-8P w-full h-full flex items-center justify-center';

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
        id={t('navigation.intro').toLowerCase()}
        className={`z-0 relative top-0 h-96H w-full
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
        `}
      />
      <motion.ul
        variants={ulVariants}
        initial="hidden"
        animate="visible"
        className={`z-50 sticky top-0 flex justify-around items-center py-24P
    ${theme === 'theme1' ? 'bg-background-dark/50' : 'bg-cyan-dark/50'}
    `}
      >
        {openSideBar ? (
          <>
            <li
              onClick={() => {
                handleToggleSideBar();
                playClick1();
              }}
              onMouseEnter={playHover}
            >
              <XMenu />
            </li>
            {navItems1.map((label) =>
              isVisible(label, currentUser) ? (
                <React.Fragment key={label}>
                  {displayName &&
                  label === t('navigation.editProfile') &&
                  !user?.id ? (
                    <motion.li className={disabledClasses} key={label}>
                      <motion.button
                        onClick={playClick1}
                        onMouseEnter={playHover}
                        disabled
                        className={contentDisabledClasses}
                      >
                        {label}
                      </motion.button>
                    </motion.li>
                  ) : (
                    <motion.li
                      onClick={playClick1}
                      onMouseEnter={playHover}
                      className={liClasses}
                      key={label}
                      variants={buttonVariants}
                      initial="hidden"
                      whileHover="hover"
                    >
                      {displayName && label === t('navigation.signOut') ? (
                        <>
                          <SignOutButton
                            label={t('navigation.signOut')}
                            contentClasses={contentClasses}
                          ></SignOutButton>
                        </>
                      ) : displayName &&
                        label === t('navigation.languageToggle') ? (
                        <button
                          onClick={toggleLanguage}
                          className={contentClasses}
                        >
                          {t('navigation.languageToggle')}
                        </button>
                      ) : (
                        <button disabled>
                          <Link
                            href={getLinkPath(label)}
                            className={contentClasses}
                          >
                            {label}
                          </Link>
                        </button>
                      )}
                    </motion.li>
                  )}
                </React.Fragment>
              ) : null
            )}
          </>
        ) : (
          <>
            <li
              onClick={() => {
                handleToggleSideBar();
                playClick1();
              }}
              onMouseEnter={playHover}
            >
              <BurgerMenu />
            </li>
            {navItems2.map((label) => (
              <motion.li
                className={`px-16P py-8P rounded-5BR cursor-pointer font-bold tracking-wide
                ${
                  theme === 'theme1'
                    ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                    : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
                }
                `}
                key={label}
                onClick={() => {
                  scrollTo(label.toLowerCase());
                  playClick2();
                }}
                onMouseEnter={playHover}
                variants={buttonVariants}
                initial="hidden"
                whileHover="hover"
              >
                {label}
              </motion.li>
            ))}
          </>
        )}
      </motion.ul>
    </>
  );
};

export default Guide;
