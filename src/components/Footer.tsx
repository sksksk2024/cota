'use client';

import { useState } from 'react';
import { useThemeStore } from './hooks/useThemeStore';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import Insta from './utils/Insta';
import LinkedIn from './utils/LinkedIn';
import GitHub from './utils/Github';
import FrontendMentor from './utils/FrontendMentor';
import Link from 'next/link';
import Email from './utils/Email';
import Phone from './utils/Phone';
import Blog from './utils/Blog';
import Games from './utils/Games';
import Live from './utils/Live';
import Tutorials from './utils/Tutorials';
import Donations from './utils/Donations';
import Newsletter from './utils/Newsletter';
import WingsLogo from './utils/WingsLogo';
import { useUser } from './hooks/useUser';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';

const Footer = () => {
  const { theme } = useThemeStore();
  const { copy, copied } = useCopyToClipboard();
  const user = useUser();

  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div
        className={`w-full h-[100dvh] flex justify-center items-center m-auto
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
      `}
      >
        <Spinner />
      </div>
    );
  }

  const displayUser = session?.user ?? user;

  return (
    <footer
      id="explore"
      className={`z-10 flex flex-col justify-center items-center py-64P sm:px-64P pb-0
        ${theme === 'theme1' ? 'text-white' : 'text-textis'}
        ${!displayUser ? 'gap-20' : 'gap-4'}
    `}
    >
      {!displayUser ? (
        <>
          <h2
            className={`text-2xl text-start font-bold
            `}
          >
            Contact Me
          </h2>
          <div
            className={`flex flex-col justify-center items-center gap-5 md:flex-row md:gap-12
        `}
          >
            <button
              onClick={() => copy('+40770753746')}
              className={`text-xl font-bold flex justify-start items-center gap-2 cursor-pointer 
          ${
            theme === 'theme1'
              ? 'text-white hover:text-warning'
              : 'text-textis hover:text-highlight'
          }
          `}
            >
              <Phone />
              +40-770-753-746 {/* Business Number */}
            </button>
            <button
              onClick={() => copy('cota8091@gmail.com')}
              className={`text-xl font-bold flex justify-start items-center gap-2 cursor-pointer
            ${
              theme === 'theme1'
                ? 'text-white hover:text-warning'
                : 'text-textis hover:text-highlight'
            }
            `}
            >
              <Email />
              cota8091@gmail.com {/* Business Email */}
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-12 md:flex-row -mb-320M">
            <div className="flex justify-around items-center gap-10">
              {/* LINKS A BIT ROTATED WHEN HOVERED */}
              <Link
                target="_blank"
                href="https://www.instagram.com/alextvop2016"
                passHref
              >
                <Insta />
              </Link>
              <Link
                target="_blank"
                href="https://github.com/sksksk2024"
                passHref
              >
                <GitHub />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/alexandru-co%C8%9Ba-34567b354/"
                passHref
              >
                <LinkedIn />
              </Link>
              <Link
                target="_blank"
                href="https://www.frontendmentor.io/profile/sksksk2024"
                passHref
              >
                <FrontendMentor />
              </Link>
            </div>
            <div className="">
              <p
                className={`font-bold
            ${theme === 'theme1' ? 'text-warning' : 'text-highlight'}
            `}
              >
                More coming soon
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* MORE TO DO */}
          <div
            className={`z-10 flex flex-col justify-center items-center gap-10 mx-auto px-16P pt-8P
${theme === 'theme1' ? 'text-white' : 'text-textis'}
`}
          >
            <h2
              className={`text-2xl text-center font-bold xl:text-start
`}
            >
              More To Do
            </h2>

            <div className="flex flex-col justify-center items-center gap-10 lg:flex-row">
              {/* LINKS A BIT ROTATED WHEN HOVERED */}
              <div className="flex justify-center items-center gap-5 sm:gap-10">
                <Link
                  target="_blank"
                  href="https://www.instagram.com/alextvop2016"
                  passHref
                >
                  <Blog />
                </Link>
                <Link
                  target="_blank"
                  href="https://github.com/sksksk2024"
                  passHref
                >
                  <Games />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/alexandru-co%C8%9Ba-34567b354/"
                  passHref
                >
                  <Live />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.frontendmentor.io/profile/sksksk2024"
                  passHref
                >
                  <Tutorials />
                </Link>
              </div>
              <div className="flex justify-center items-center gap-5 sm:gap-10">
                <Link
                  target="_blank"
                  href="https://www.frontendmentor.io/profile/sksksk2024"
                  passHref
                >
                  <Donations />
                </Link>
                <div className="relative flex justify-center items-center m-auto w-48W h-48H">
                  <Link
                    target="_blank"
                    className="absolute top-16I"
                    href="https://www.frontendmentor.io/profile/sksksk2024"
                    passHref
                  >
                    <WingsLogo />
                  </Link>
                </div>
                <Link
                  target="_blank"
                  href="https://www.frontendmentor.io/profile/sksksk2024"
                  passHref
                >
                  <Newsletter />
                </Link>
              </div>
            </div>
          </div>

          {/* CONTACT ME */}
          <div
            className={`z-10 flex flex-col justify-center items-center gap-10 w-full mx-auto p-64P pb-0
${theme === 'theme1' ? 'text-white' : 'text-textis'}
`}
          >
            <h2
              className={`text-2xl text-center font-bold xl:text-start
`}
            >
              Explore
            </h2>
            <div
              className={`flex flex-col justify-center items-center gap-5 md:flex-row md:gap-12
`}
            >
              <button
                onClick={() => copy('+40770753746')}
                className={`text-xl font-bold flex justify-start items-center gap-2 cursor-pointer 
${
  theme === 'theme1'
    ? 'text-white hover:text-warning'
    : 'text-textis hover:text-highlight'
}
`}
              >
                <Phone />
                +40-770-753-746 {/* Business Number */}
              </button>
              <button
                onClick={() => copy('cota8091@gmail.com')}
                className={`text-xl font-bold flex justify-start items-center gap-2 cursor-pointer
${
  theme === 'theme1'
    ? 'text-white hover:text-warning'
    : 'text-textis hover:text-highlight'
}
`}
              >
                <Email />
                cota8091@gmail.com {/* Business Email */}
              </button>
            </div>

            <div className="flex flex-col justify-center items-center gap-12 md:flex-row -mb-320M">
              <div className="flex justify-around items-center gap-10">
                {/* LINKS A BIT ROTATED WHEN HOVERED */}
                <Link
                  target="_blank"
                  href="https://www.instagram.com/alextvop2016"
                  passHref
                >
                  <Insta />
                </Link>
                <Link
                  target="_blank"
                  href="https://github.com/sksksk2024"
                  passHref
                >
                  <GitHub />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/alexandru-co%C8%9Ba-34567b354/"
                  passHref
                >
                  <LinkedIn />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.frontendmentor.io/profile/sksksk2024"
                  passHref
                >
                  <FrontendMentor />
                </Link>
              </div>
              <div className="">
                <p
                  className={`font-bold
${theme === 'theme1' ? 'text-warning' : 'text-highlight'}
`}
                >
                  More coming soon
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </footer>
  );
};

export default Footer;
