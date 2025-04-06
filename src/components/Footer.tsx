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

const Footer = () => {
  const { theme } = useThemeStore();
  const { copy, copied } = useCopyToClipboard();
  const [isSignedUp, setSignedUp] = useState<boolean>(false);

  return (
    <footer
      id="explore"
      className={`z-10 flex flex-col justify-center items-center p-64P pb-0
        ${theme === 'theme1' ? 'text-white' : 'text-textis'}
        ${!isSignedUp ? 'gap-20' : 'gap-4'}
    `}
    >
      {!isSignedUp ? (
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

            <div className="flex flex-wrap justify-center items-center gap-10">
              {/* LINKS A BIT ROTATED WHEN HOVERED */}
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
              <Link
                target="_blank"
                href="https://www.frontendmentor.io/profile/sksksk2024"
                passHref
              >
                <Donations />
              </Link>
              <Link
                target="_blank"
                href="https://www.frontendmentor.io/profile/sksksk2024"
                passHref
              >
                Wings
              </Link>
              <Link
                target="_blank"
                href="https://www.frontendmentor.io/profile/sksksk2024"
                passHref
              >
                <Newsletter />
              </Link>
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
