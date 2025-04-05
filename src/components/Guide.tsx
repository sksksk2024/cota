'use client';

import { useThemeStore } from './store/useThemeStore';

const Guide = () => {
  const { theme } = useThemeStore();

  return (
    <ul
      className={`flex justify-around items-center py-24P
    ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
    `}
    >
      <li
        className={`border border-2 border-green-dark p-8P rounded-5BR
        ${theme === 'theme1' ? ' bg-green-dark' : ' bg-background-dark'}
        `}
      >
        Intro
      </li>
      <li
        className={`border border-2 border-green-dark p-8P rounded-5BR
        ${theme === 'theme1' ? ' bg-green-dark' : ' bg-background-dark'}
        `}
      >
        About
      </li>
      <li
        className={`border border-2 border-green-dark p-8P rounded-5BR
        ${theme === 'theme1' ? ' bg-green-dark' : ' bg-background-dark'}
        `}
      >
        Goals/Qualities
      </li>
      <li
        className={`border border-2 border-green-dark p-8P rounded-5BR
        ${theme === 'theme1' ? ' bg-green-dark' : ' bg-background-dark'}
        `}
      >
        Contact
      </li>
    </ul>
  );
};

export default Guide;
