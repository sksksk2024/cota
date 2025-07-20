'use client';

import { useThemeStore } from './hooks/useThemeStore';
const Insta = dynamic(() => import('./utils/Insta'), { ssr: false });
const LinkedIn = dynamic(() => import('./utils/LinkedIn'), { ssr: false });
const GitHub = dynamic(() => import('./utils/Github'), { ssr: false });
const FrontendMentor = dynamic(() => import('./utils/FrontendMentor'), {
  ssr: false,
});

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
import dynamic from 'next/dynamic';
import { useSound } from './hooks/useSound';
import { block, click, ding } from './sounds/sounds';
import { useTranslation } from './hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  const { play: playClick } = useSound(click, 0.02);
  const { play: playBlock } = useSound(block, 0.02);
  const { play: playHover } = useSound(ding, 0.05);

  const { theme } = useThemeStore();
  const { user } = useUser();

  const { data: session } = useSession();

  const displayUser = session?.user.name || (user?.id ? user : null);

  return (
    <footer
      id={t('navigation.explore').toLowerCase()}
      className={`z-0 flex flex-col justify-center items-center py-64P sm:px-64P pb-0
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
            {t('footer.title1')}
          </h2>
          <div
            className={`flex flex-col justify-center items-center gap-5 md:flex-row md:gap-12
        `}
          >
            <button
              onMouseEnter={playHover}
              onClick={playBlock}
              className={`select-text text-xl font-bold flex justify-start items-center gap-2 cursor-pointer 
          ${
            theme === 'theme1'
              ? 'text-white hover:text-warning'
              : 'text-textis hover:text-highlight'
          }
          `}
            >
              <Phone />
              {/* Business Number */}
            </button>
            <button
              onMouseEnter={playHover}
              onClick={playBlock}
              className={`select-text text-xl font-bold flex justify-start items-center gap-2 cursor-pointer
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
                onMouseEnter={playHover}
                onClick={playClick}
                target="_blank"
                href="https://www.instagram.com/h1_cota_alexandru_h1/"
                passHref
              >
                <Insta />
              </Link>
              <Link
                onMouseEnter={playHover}
                onClick={playClick}
                target="_blank"
                href="https://github.com/sksksk2024"
                passHref
              >
                <GitHub />
              </Link>
              <Link
                onMouseEnter={playHover}
                onClick={playClick}
                target="_blank"
                href="https://www.linkedin.com/in/alexandru-co%C8%9Ba-34567b354/"
                passHref
              >
                <LinkedIn />
              </Link>
              <Link
                onMouseEnter={playHover}
                onClick={playClick}
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
                {t('footer.soon')}
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
              {t('footer.title2')}
            </h2>

            <div className="flex flex-col justify-center items-center gap-10 lg:flex-row">
              {/* LINKS A BIT ROTATED WHEN HOVERED */}
              <div className="flex justify-center items-center gap-5 sm:gap-10">
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  target="_blank"
                  href="https://cotablog.onrender.com/"
                  passHref
                >
                  <Blog />
                </Link>
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  href="/games"
                  passHref
                >
                  <Games />
                </Link>
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  href="/live"
                  passHref
                >
                  <Live />
                </Link>
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  href="/tutorials"
                  passHref
                >
                  <Tutorials />
                </Link>
              </div>
              <div className="flex justify-center items-center gap-5 sm:gap-10">
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  href="/donations"
                  passHref
                >
                  <Donations />
                </Link>
                <div className="relative flex justify-center items-center m-auto w-48W h-48H">
                  <Link
                    onMouseEnter={playHover}
                    onClick={playClick}
                    target="_blank"
                    className="absolute top-16I"
                    href="https://next-wings.onrender.com/"
                    passHref
                  >
                    <WingsLogo />
                  </Link>
                </div>
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  href="/newsletter"
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
              {t('footer.title3')}
            </h2>
            <div
              className={`flex flex-col justify-center items-center gap-5 md:flex-row md:gap-12
`}
            >
              <button
                onMouseEnter={playHover}
                onClick={playBlock}
                className={`select-text text-xl font-bold flex justify-start items-center gap-2 cursor-pointer 
${
  theme === 'theme1'
    ? 'text-white hover:text-warning'
    : 'text-textis hover:text-highlight'
}
`}
              >
                <Phone />
                {/* Business Number */}
              </button>
              <button
                onMouseEnter={playHover}
                onClick={playBlock}
                className={`select-text text-xl font-bold flex justify-start items-center gap-2 cursor-pointer
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
                  onMouseEnter={playHover}
                  onClick={playClick}
                  target="_blank"
                  href="https://www.instagram.com/h1_cota_alexandru_h1/"
                  passHref
                >
                  <Insta />
                </Link>
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  target="_blank"
                  href="https://github.com/sksksk2024"
                  passHref
                >
                  <GitHub />
                </Link>
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  target="_blank"
                  href="https://www.linkedin.com/in/alexandru-co%C8%9Ba-34567b354/"
                  passHref
                >
                  <LinkedIn />
                </Link>
                <Link
                  onMouseEnter={playHover}
                  onClick={playClick}
                  target="_blank"
                  href="https://www.frontendmentor.io/profile/sksksk2024"
                  passHref
                >
                  <FrontendMentor />
                </Link>
                {/* YOUTUBE */}
                {/* TIKTOK not now */}
                {/* TWITCH not now */}
              </div>
              <div className="">
                <p
                  className={`font-bold
${theme === 'theme1' ? 'text-warning' : 'text-highlight'}
`}
                >
                  {t('footer.soon')}
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
