'use client';

import { useToast } from '@/components/hooks/useToast';
import { motion } from 'framer-motion';
import { OpenEye } from '@/components/svgs/OpenEye';
import { CloseEye } from '@/components/svgs/CloseEye';
import {
  buttonVariants,
  mainButtonVariants,
  inputVariants,
} from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import GitHubIcon from '@/components/svgs/github.svg';
import GoogleIcon from '@/components/svgs/google.svg';
import { useRouter } from 'next/navigation';
import { signupSchema, SignupInput } from '@/lib/schemas';
import { signIn } from 'next-auth/react';
import PageWrapper from '@/components/PageWrapper';
import { useSound } from '@/components/hooks/useSound';
import { click, ding, errorSound, yay } from '@/components/sounds/sounds';
import { useTranslation } from '@/components/hooks/useTranslation';

const SignUp = () => {
  const { t } = useTranslation();
  const { play: playClick } = useSound(click, 0.3);
  const { play: playHover } = useSound(ding, 0.2);
  const { play: playError } = useSound(errorSound, 0.1);
  const { play: playYay } = useSound(yay, 0.1);

  const { success, error, loading, dismiss } = useToast();

  const router = useRouter();

  const { theme } = useThemeStore();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value;

    const formData: SignupInput = { name, email, password };

    // Validate with ZOD
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      playError();
      const errorList = result.error.errors
        .map((err) => err.message)
        .join('\n');
      setErrorMsg(errorList);
      return;
    }

    console.log('hello1'); // Log the response text
    loading('Signing Up...');
    // Try catch block for validation
    console.log('hello2'); // Log the response text
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important for sending/receiving cookies
      });

      const text = await res.text();
      console.log('Response Text:', text); // Log the response text

      const data = JSON.parse(text);
      dismiss();

      if (res.ok) {
        playYay();
        success('Successfully Signed Up!');
        router.push('/');
      } else {
        playError();
        setErrorMsg(data.error || 'Unknown error occurred');
        error(data.error || 'Something Went Wrong!');
      }
    } catch (err) {
      playError();
      setErrorMsg(`Network error or unexpected issue: ${err}`);
      error('Something Went Wrong!');
    }
  };

  return (
    <PageWrapper>
      <main
        className={`w-full h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-16P md:px-64P
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
    `}
      >
        {/* PAGE TITLE */}
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          {t('up.title')}
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className={`shadow-deep-green flex flex-col justify-center items-center gap-5 px-16P py-32P rounded-5BR w-full min-w-container-300 max-w-container-600
        caret-black md:px-32P
        ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}
        `}
        >
          <label
            className={`w-full
            `}
            htmlFor="name"
            aria-label="Enter Name"
          >
            <motion.input
              className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
              id="name"
              name="name"
              type="text"
              placeholder={t('placeholders.name')}
              variants={inputVariants}
              initial="hidden"
              whileHover="hover"
            />
          </label>
          <label className={`w-full`} htmlFor="email" aria-label="Enter Email">
            <motion.input
              className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              variants={inputVariants}
              initial="hidden"
              whileHover="hover"
            />
          </label>

          <label
            className={`relative group w-full`}
            htmlFor="password"
            aria-label="Enter Password"
          >
            <motion.input
              className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('placeholders.password')}
              variants={inputVariants}
              initial="hidden"
              whileHover="hover"
            />
            {!showPassword ? (
              <motion.button
                type="button"
                aria-label="Show Password"
                className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? 'hover:text-background-dark group-hover:bg-warning'
                : 'hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                typeof="button"
                onClick={() => setShowPassword(true)}
              >
                <OpenEye />
              </motion.button>
            ) : (
              <button
                type="button"
                aria-label="Hide Password"
                className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
            ${
              theme === 'theme1'
                ? ' hover:text-background-dark group-hover:bg-warning'
                : ' hover:text-cyan-dark group-hover:bg-highlight'
            }`}
                onClick={() => setShowPassword(false)}
              >
                <CloseEye />
              </button>
            )}
          </label>

          <motion.button
            onClick={playClick}
            onMouseEnter={playHover}
            type="submit"
            className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
            `}
            variants={mainButtonVariants}
            initial="hidden"
            whileHover="hover"
          >
            {t('up.action')}
          </motion.button>

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <div className="select-text pointer-events-auto cursor-pointer text-center text-red-500 font-semibold">
              {errorMsg.split('\n').map((msg, i) => (
                <p
                  className="select-text pointer-events-auto cursor-pointer"
                  key={i}
                >
                  {msg}
                </p>
              ))}
            </div>
          )}

          {/* DIVIDER */}
          <h2 className="flex justify-center items-center gap-2 sm:gap-0 text-center w-full mx-auto my-16M">
            <span className="block bg-white w-1/6 xs:w-1/3 h-[2px]"></span>
            <span className="text-lg xs:w-1/3 tracking-widest">
              {t('up.or')}
            </span>
            <span className="block bg-white w-1/6 xs:w-1/3 h-[2px]"></span>
          </h2>

          {/* SOCIAL AUTH */}
          <div className="flex flex-col justify-center items-center gap-5 w-full">
            <motion.button
              onMouseEnter={playHover}
              className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
              `}
              onClick={() => {
                playClick();
                signIn('google', { callbackUrl: '/' });
              }}
              variants={mainButtonVariants}
              initial="hidden"
              whileHover="hover"
            >
              <GoogleIcon className="w-6 h-6 text-white hover:text-cyan-400 transition stroke-current stroke-2" />
              Google
            </motion.button>

            <motion.button
              onMouseEnter={playHover}
              className={`flex justify-center items-center gap-2 font-bold text-lg text-center font-bold px-32P py-8P rounded-5BR ring-none border-none w-full tracking-0.1 shadow-soft-cyan cursor-pointer transition
              ${
                theme === 'theme1'
                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
              }
              `}
              onClick={() => {
                playClick();
                signIn('github', { callbackUrl: '/' });
              }}
              variants={mainButtonVariants}
              initial="hidden"
              whileHover="hover"
            >
              <GitHubIcon className="w-6 h-6 text-white hover:text-cyan-400 transition stroke-current stroke-3" />
              GitHub
            </motion.button>
          </div>

          <p
            className={`flex flex-col justify-center items-center xs:block text-sm text-center font-bold ${
              theme === 'theme1' ? 'text-white' : 'text-textis'
            }`}
          >
            <span>{t('up.q')} </span>
            <Link
              className={`underline font-semibold
              ${
                theme === 'theme1'
                  ? 'text-white hover:text-warning'
                  : 'text-background-dark hover:text-highlight hover:shadow-2xl shadow-soft-cyan'
              }`}
              href="/signin"
            >
              {t('up.in')}
            </Link>
          </p>
        </form>

        {/* HOME LINK */}
        <motion.div
          onClick={playClick}
          onMouseEnter={playHover}
          className={`w-full min-w-container-300 max-w-container-600 text-center cursor-pointer p-16P rounded-5BR font-bold tracking-wide
        ${
          theme === 'theme1'
            ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
            : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
        }
        `}
          variants={buttonVariants}
          initial="hidden"
          whileHover="hover"
          animate="exit"
        >
          <Link href="/" passHref>
            {t('up.home')}
          </Link>
        </motion.div>
      </main>
    </PageWrapper>
  );
};

export default SignUp;
