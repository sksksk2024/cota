'use client';

import Info from '@/components/Info';
import Header from '@/components/Header';
import Working from '@/components/Working';
import { useThemeStore } from '@/components/store/useThemeStore';
import Guide from '@/components/Guide';

const Home = () => {
  const { theme } = useThemeStore();

  return (
    <section className="relative">
      {/* Object to fill in the gaps */}
      <div
        className={`relative -top-96I
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
        `}
      >
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
      </div>
      <div
        className={`z-0 absolute -bottom-208I h-300H md:-bottom-96I md:h-192H w-full
            ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
            `}
      />
    </section>
  );
};

export default Home;
