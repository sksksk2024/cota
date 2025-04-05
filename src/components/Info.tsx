'use client';

import Image from 'next/image';
import logo from './../app/favicon.ico';
import { useState } from 'react';
import { useThemeStore } from './store/useThemeStore';
import About from './About';
import Goals from './Goals';

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
        className={`relative flex flex-col justify-around items-center w-full h-800H
        ${
          theme === 'theme1' ? 'bg-deep-dark-transition' : 'bg-green-cyan-light'
        }
        `}
      >
        <div className="flex justify-around items-center w-full">
          {goals === false ? <About /> : <Goals />}
        </div>
        {/* toggle 2 sections with button and transition */}
        <button
          type="button"
          className="absolute bottom-32I bg-black text-3xl text-white cursor-pointer"
          onClick={handleToggle}
        >
          Next section
        </button>
      </main>
    </>
  );
};

export default Info;
