'use client';

import Info from '@/components/Info';
import Header from '@/components/Header';
import Working from '@/components/Working';
import { useThemeStore } from '@/components/store/useThemeStore';
import Guide from '@/components/Guide';

const Home = () => {
  const { theme } = useThemeStore();

  return (
    <>
      <Guide />
      <Header />
      <Working />
      {/* Bottom gradient background for header effect */}
      <div
        className={`z-0 relative bottom-80I h-auto w-full backdrop-blur-md -mb-160M
          ${theme === 'theme1' ? 'bg-deep-dark-transition' : 'bg-deep-dark'}
          `}
      >
        <Info />
      </div>
    </>
  );
};

export default Home;
