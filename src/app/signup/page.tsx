'use client';

import { useThemeStore } from '@/components/hooks/useThemeStore';
import Link from 'next/link';
import { useState } from 'react';
import GitHubIcon from '@/components/svgs/github.svg';
import GoogleIcon from '@/components/svgs/google.svg';
import InstaIcon from '@/components/svgs/instagram.svg';
import LinkedInIcon from '@/components/svgs/linkedin.svg';
import OpenEye from '@/components/svgs/openEye.svg';
import CloseEye from '@/components/svgs/closeEye.svg';
import { button } from 'framer-motion/client';

const signup = () => {
  const { theme } = useThemeStore();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className={`w-full h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-64P
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
    `}
    >
      {/* PAGE TITLE */}
      <h1
        className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
      >
        Sign Up Page
      </h1>

      {/* FORM */}
      <form
        className={`shadow-deep-green flex flex-col justify-center items-center gap-5 p-32P rounded-5BR w-full min-w-container-300 max-w-container-600
        caret-black
        ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}
        `}
      >
        <label
          className={`w-full
            `}
          htmlFor="name"
        >
          <input
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
            id="name"
            name="name"
            type="text"
            placeholder="Add Your Name"
          />
        </label>
        <label className={`w-full`} htmlFor="email">
          <input
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
            id="email"
            name="email"
            type="email"
            placeholder="Add Your Email"
          />
        </label>

        <label className={`relative group w-full`} htmlFor="password">
          <input
            className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
            id="password"
            name="password"
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder="Add Your Password"
          />
          {!showPassword ? (
            <button
              type="button"
              aria-label="Show Password"
              className={`absolute top-1 right-1 flex justify-center items-center gap-2 font-bold text-lg text-center font-bold rounded-5BR ring-none border-none w-32W tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'bg-snow-gray hover:text-background-dark group-hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }`}
              typeof="button"
              onClick={() => setShowPassword(true)}
            >
              <OpenEye />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Hide Password"
              className={`absolute top-1 right-1 flex justify-center items-center gap-2 font-bold text-lg text-center font-bold rounded-5BR ring-none border-none w-32W tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'bg-snow-gray hover:text-background-dark group-hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }`}
              onClick={() => setShowPassword(false)}
            >
              <CloseEye />
            </button>
          )}
        </label>

        {/* DIVIDER */}
        <h2 className="flex justify-center items-center text-center w-full mx-auto my-64M">
          <span className="block bg-white w-1/3 h-[2px]"></span>
          <span className="text-lg w-1/3 tracking-widest">or sign up with</span>
          <span className="block bg-white w-1/3 h-[2px]"></span>
        </h2>

        {/* SOCIAL AUTH */}
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <button
            className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
          >
            <GoogleIcon className="w-6 h-6 text-white hover:text-cyan-400 transition stroke-current stroke-2" />
            Google
          </button>

          <button
            className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
          >
            <GitHubIcon className="w-6 h-6 text-white hover:text-cyan-400 transition stroke-current stroke-3" />
            GitHub
          </button>

          {/* Instagram */}
          <button
            className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
          >
            <InstaIcon className="w-6 h-6 text-white hover:text-cyan-400 transition stroke-current stroke-0" />
            Instagram
          </button>

          <button
            className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
          >
            <LinkedInIcon className="w-6 h-6 text-white hover:text-cyan-400 transition stroke-current stroke-2" />
            LinkedIn
          </button>
        </div>
      </form>

      {/* HOME LINK */}
      <Link
        className={`cursor-pointer px-16P py-8P rounded-5BR font-bold tracking-wide
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
              `}
        href="/"
        passHref
      >
        Go Home
      </Link>
    </main>
  );
};

export default signup;
