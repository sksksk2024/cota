'use client';

import { useState } from 'react';
import { useThemeStore } from './hooks/useThemeStore';
import About from './About';
import Goals from './Goals';
import Calithenics from './Calisthenics';
import Footer from './Footer';
import Arrow from './utils/Arrow';

const Info = () => {
  const { theme } = useThemeStore();

  const [goals, setGoals] = useState<boolean>(false);

  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

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
        <div className="relative flex flex-col justify-start items-start text-center w-full xl:top-48I xl:text-start xl:h-880H">
          <div className="flex justify-around items-center pt-48P w-full max-w-container-1000 mx-auto xl:max-w-container-1440 xl:h-600H">
            {goals === false ? <About /> : <Goals />}
          </div>
          {/* toggle 2 sections with button and transition */}
          <div
            className="relative top-48I mx-auto text-xl my-64M xl:hidden"
            onClick={handleToggle}
          >
            <button
              type="button"
              className={`cursor-pointer px-16P pr-64P py-8P rounded-5BR font-bold tracking-wide
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
              `}
            >
              Next section
            </button>
            <div className="absolute left-176I bottom-[1px]">
              <Arrow />
            </div>
          </div>

          <div className="flex justify-around items-center pt-48P w-full max-w-container-1000 mx-auto xl:max-w-container-1440 xl:h-600H">
            <div
              className={`relative -left-32I hidden flex justify-center items-center text-xl text-white my-64M cursor-pointer xl:block xl:w-1/2 xl:max-w-container-1000
              `}
              onClick={handleToggle}
            >
              <button
                type="button"
                className={`px-16P pr-64P py-8P rounded-5BR cursor-pointer font-bold tracking-wide
                  ${
                    theme === 'theme1'
                      ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                      : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
                  }
                  `}
              >
                Next section
              </button>
              <div className="absolute left-176I bottom-[1px]">
                <Arrow />
              </div>
            </div>
            <div className="hidden xl:block opacity-0">hello</div>
          </div>
        </div>
        <Calithenics />
        {!isSignedUp ? (
          <>
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
          </>
        ) : (
          <>
            <div
              className={`z-10 relative -top-64I pt-144P w-full h-848H md:h-640H
            ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
            `}
            >
              <Footer />
            </div>
            <div
              className={`z-0 absolute -bottom-208I h-272H md:-bottom-80I lg:-bottom-320I md:h-400H lg:h-600H w-full
            ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
            `}
            ></div>
          </>
        )}
      </main>
    </>
  );
};

export default Info;
