'use client';

import Image from 'next/image';
import logo from './../app/favicon.ico';
import { useState } from 'react';
import { useThemeStore } from './store/useThemeStore';
import About from './About';
import Goals from './Goals';
import Calithenics from './Calisthenics';
import Footer from './Footer';

const Info = () => {
  const { theme } = useThemeStore();

  const [goals, setGoals] = useState(false);

  // Handle Toggle Between About Me and Goals
  const handleToggle = () => {
    setGoals(!goals);
  };

  return (
    <>
      <main
        className={`relative flex flex-col justify-around items-center w-full pt-128P
        ${
          theme === 'theme1' ? 'bg-deep-dark-transition' : 'bg-green-cyan-light'
        }
        `}
      >
        <div className="relative flex flex-col justify-start items-start text-center w-full xl:text-start xl:h-800H">
          <div className="flex justify-around items-center pt-48P w-full max-w-container-1000 mx-auto xl:max-w-container-1440 xl:h-600H">
            {goals === false ? <About /> : <Goals />}
          </div>
          {/* toggle 2 sections with button and transition */}
          <button
            type="button"
            className="mx-auto bg-black text-3xl text-white my-64M cursor-pointer xl:hidden"
            onClick={handleToggle}
          >
            Next section
          </button>

          <div className="flex justify-around items-center pt-48P w-full max-w-container-1000 mx-auto xl:max-w-container-1440 xl:h-600H">
            <div className="relative -left-32I hidden xl:block text-3xl text-white my-64M cursor-pointer xl:w-1/2 xl:max-w-container-1000">
              <button type="button" className="bg-black" onClick={handleToggle}>
                Next section
              </button>
            </div>
            <div className="hidden xl:block opacity-0">hello</div>
          </div>
        </div>
        <Calithenics />
        <div
          className={`z-10 relative -top-64I pt-144P w-full h-500H
          ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
          `}
        >
          <Footer />
        </div>
        <div
          className={`z-0 absolute -bottom-208I h-272H md:-bottom-80I md:h-400H w-full
          ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
          `}
        ></div>
      </main>
    </>
  );
};

export default Info;
