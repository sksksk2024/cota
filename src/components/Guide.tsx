'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from './store/useThemeStore';

const Guide = () => {
  const { theme } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      <div
        id="intro"
        className={`z-0 relative top-96I h-96H w-full
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
        `}
      ></div>
      <ul
        className={`z-50 sticky top-0 flex justify-around items-center py-24P
    ${theme === 'theme1' ? 'bg-background-dark/50' : 'bg-cyan-dark/50'}
    `}
      >
        {['Intro', 'About', 'Contact'].map((label) => (
          <li
            key={label}
            onClick={() => scrollTo(label.toLowerCase())}
            className={`border border-2 border-green-dark p-8P rounded-5BR cursor-pointer hover:opacity-80
        ${theme === 'theme1' ? ' bg-green-dark' : ' bg-background-dark'}
        `}
          >
            {label}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Guide;
