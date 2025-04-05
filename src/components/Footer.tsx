'use client';

import Image from 'next/image';
import phone from './../images/icon-phone.svg';
import email from './../images/icon-email.svg';
import { useThemeStore } from './store/useThemeStore';
import Insta from './utils/Insta';
import LinkedIn from './utils/LinkedIn';
import GitHub from './utils/Github';
import FrontendMentor from './utils/FrontendMentor';
import Link from 'next/link';
import Email from './utils/Email';
import Phone from './utils/Phone';

const Footer = () => {
  const { theme } = useThemeStore();

  return (
    <footer
      id="contact"
      className={`z-10 flex flex-col justify-center items-center gap-20 p-64P pb-0
        ${theme === 'theme1' ? 'text-white' : 'text-textis'}
    `}
    >
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
        <div
          className={`text-xl font-bold flex justify-start items-center gap-2
          ${theme === 'theme1' ? 'text-white' : 'text-textis'}
          `}
        >
          <Phone />
          +40-770-753-746 {/* Business Number */}
        </div>
        <div className="text-xl font-bold flex justify-start items-center gap-2">
          <Email />
          cota8091@gmail.com {/* Business Email */}
        </div>
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
          <Link target="_blank" href="https://github.com/sksksk2024" passHref>
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
    </footer>
  );
};

export default Footer;
