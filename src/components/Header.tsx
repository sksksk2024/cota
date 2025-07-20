'use client';

import { motion } from 'framer-motion';
import { sunVariants, moonVariants } from './motionVariants/motionVariants';
import CotaLogo from './svgs/CotaLogo';
import Sun from './utils/Sun';
import Moon from './utils/Moon';
import { useUser } from './hooks/useUser';
import { useSession } from 'next-auth/react';
import { useToast } from './hooks/useToast';
import { useThemeStore } from './hooks/useThemeStore';
import { useToggleTheme } from './hooks/useToggleTheme';
import { useSound } from './hooks/useSound';
import { click, ding, errorSound } from './sounds/sounds';
import { useTranslation } from './hooks/useTranslation';

const Header = () => {
  const { t } = useTranslation();

  const { play: playClick } = useSound(click, 0.01);
  const { play: playHover } = useSound(ding, 0.05);
  const { play: playError } = useSound(errorSound, 0.1);

  const { theme } = useThemeStore();
  const toggleTheme = useToggleTheme();
  const { user } = useUser();

  const { data: session } = useSession();
  const { error } = useToast(); // Call useToast hook here to avoid calling it inside zustand store.

  const displayName = session?.user?.name || user?.name;

  // Handle theme toggle with error handling
  const handleThemeToggle = async () => {
    if (session?.user?.email || user?.email) {
      playClick();
      toggleTheme(); // Proceed with toggling theme
    } else {
      playError();
      error('You must sign up if you want to change the theme!');
    }
  };

  return (
    <header
      className={`z-10 relative
      `}
    >
      <div
        className={`relative z-50 flex flex-col justify-center items-center gap-10 text-center p-16P py-32P pb-144P bg-cyanDark md:justify-around md:flex-row md:p-48P`}
      >
        <div className="group flex justify-around items-center w-full md:w-auto">
          <CotaLogo />
          {theme === 'theme1' ? (
            <motion.div
              variants={sunVariants}
              initial="initial"
              whileHover="hover"
              onMouseEnter={playHover}
              drag
              dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
              dragElastic={0.7}
            >
              <Sun
                onClick={() => {
                  handleThemeToggle();
                }}
                className="min-w-container-48 w-64W h-64H cursor-pointer fill-white text-white hover:text-warning hover:fill-warning transition-colors duration-300 md:hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              variants={moonVariants}
              initial="initial"
              whileHover="hover"
              onMouseEnter={playHover}
              drag
              dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
              dragElastic={0.7}
            >
              <Moon
                onClick={handleThemeToggle}
                className="min-w-container-48 w-64W h-64H cursor-pointer fill-textis hover:fill-highlight transition-colors duration-300 md:hidden"
              />
            </motion.div>
          )}
        </div>
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          {displayName ? (
            <>
              {t('header.welcome')}
              <span
                className={`
  ${theme === 'theme1' ? 'text-warning' : 'text-highlight'}
  `}
              >
                {displayName}
              </span>
              ! 🫡
            </>
          ) : (
            t('header.defaultWelcome')
          )}
        </h1>

        {theme === 'theme1' ? (
          <motion.div
            variants={sunVariants}
            initial="initial"
            whileHover="hover"
            onMouseEnter={playHover}
            drag
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            dragElastic={0.7}
          >
            <Sun
              onClick={handleThemeToggle}
              className="hidden min-w-container-48 w-64W h-64H cursor-pointer fill-white text-white hover:text-warning hover:fill-warning transition-colors duration-300 md:block"
            />
          </motion.div>
        ) : (
          <motion.div
            variants={moonVariants}
            initial="initial"
            whileHover="hover"
            onMouseEnter={playHover}
            drag
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
            dragElastic={0.7}
          >
            <Moon
              onClick={handleThemeToggle}
              className="hidden min-w-container-48 w-64W h-64H cursor-pointer fill-textis hover:fill-highlight transition-colors duration-300 md:block"
            />
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
