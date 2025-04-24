'use client';

import { useToast } from '@/components/hooks/useToast';
import { motion } from 'framer-motion';
import {
  mainButtonVariants,
  buttonVariants,
  inputVariants,
} from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { NewsLetterInput, newsLetterSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';
import { Unlocked } from '../svgs/Unlocked';
import { Locked } from '../svgs/Locked';
import { useUser } from '../hooks/useUser';
import ProtectedPageAll from '@/components/ProtectedPageAll';

const NewsletterMain = () => {
  const { success, error, loading, dismiss } = useToast();

  const router = useRouter();
  const session = useSession();

  const { theme } = useThemeStore();

  const { user } = useUser();

  const displayEmail = session?.data?.user?.email || user?.email;

  const [email, setEmail] = useState(displayEmail || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [typeEmail, setTypeEmail] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userEmail =
      email?.trim() || session?.data?.user?.email || user?.email;

    if (!userEmail) {
      setErrorMsg('Please enter a valid email address or sign in first.');
      return;
    }

    const formData: NewsLetterInput = { email: userEmail };

    const result = newsLetterSchema.safeParse(formData);
    if (!result.success) {
      const errorList = result.error.errors
        .map((err) => err.message)
        .join('\n');
      setErrorMsg(errorList);
      return;
    }

    loading('Subscribing...');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        setErrorMsg(null);
        setTimeout(() => {
          success(`You've Successfully Subscribed!`);
          router.push('/');
        }, 2000);
      } else {
        setErrorMsg(data.error || 'Something Went Wrong.');
        error(data.error || 'Failed To Subscribe!');
      }
    } catch (err) {
      setErrorMsg('Network error or unexpected issue.');
      error('Something Went Wrong!');
    } finally {
      dismiss();
    }
  };

  return (
    <ProtectedPageAll>
      <main
        className={`w-full h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-16P py-48P md:px-64P
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
    `}
      >
        {/* PAGE TITLE */}
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          Newsletter Page
        </h1>

        {/* SUBSCRIBE FORM */}
        <form
          onSubmit={handleSubmit}
          className={`text-center shadow-deep-green flex flex-col justify-center items-center gap-5 px-16P py-32P rounded-5BR w-full min-w-container-300 max-w-container-600
        caret-black md:px-32P
        ${theme === 'theme1' ? 'bg-deep-dark' : 'bg-green-cyan-light'}
        `}
        >
          {displayEmail ? (
            <>
              <p
                className={`${theme === 'theme1' ? 'text-white' : 'text-textis'}`}
              >
                Signed in as:{' '}
                <span
                  className={`font-bold ${theme === 'theme1' ? 'text-warning' : 'text-highlight'}`}
                >
                  {displayEmail}
                </span>
              </p>
              <p
                className={`${theme === 'theme1' ? 'text-white' : 'text-textis'}`}
              >
                Subscribe with a different email? Click the lock icon.
              </p>
              <label
                className={`relative group w-full
              ${!typeEmail && 'cursor-not-allowed select-none'}`}
                htmlFor="email"
                aria-label="Enter Email"
              >
                <input
                  className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
                ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
                ${!typeEmail && 'pointer-events-none'}
                `}
                  type="email"
                  id="email"
                  readOnly={!typeEmail}
                  tabIndex={!typeEmail ? -1 : 0}
                  disabled={!typeEmail}
                  value={email || displayEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Use different email (optional)"
                />
                {!typeEmail ? (
                  <button
                    type="button"
                    aria-label="Edit Name"
                    className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
                        ${
                          theme === 'theme1'
                            ? 'hover:text-background-dark group-hover:bg-warning'
                            : 'hover:text-cyan-dark group-hover:bg-highlight'
                        }`}
                    typeof="button"
                    onClick={() => setTypeEmail(true)}
                  >
                    <Locked />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label="Hide Name"
                    className={`absolute top-0 right-0 bg-snow-gray rounded-5BR ring-none border-none w-40W p-8P tracking-0.1 shadow-soft-cyan cursor-pointer
                        ${
                          theme === 'theme1'
                            ? ' hover:text-background-dark group-hover:bg-warning'
                            : ' hover:text-cyan-dark group-hover:bg-highlight'
                        }`}
                    onClick={() => setTypeEmail(false)}
                  >
                    <Unlocked />
                  </button>
                )}
              </label>
            </>
          ) : (
            <label className={`w-full`} htmlFor="email">
              <motion.input
                className={`outline-none text-textis text-center font-bold px-32P py-8P rounded-5BR bg-snow-gray border-none w-full shadow-soft-cyan focus:shadow-hover-cyan placeholder:text-gray-400 placeholder:opacity-90 focus:outline-none focus:ring-0 focus:border-transparent hover:placeholder:text-gray-900
              ${theme === 'theme1' ? 'hover:bg-warning' : 'hover:bg-highlight'}
              `}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                variants={inputVariants}
                initial="hidden"
                whileHover="hover"
              />
            </label>
          )}

          <motion.button
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
            Subscribe
          </motion.button>

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <div className="text-center text-red-500 font-semibold">
              {errorMsg?.split('\n').map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
          )}
        </form>

        <motion.button
          className={`w-full min-w-container-300 max-w-container-600 cursor-pointer p-16P rounded-5BR font-bold tracking-wide
          ${
            theme === 'theme1'
              ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
              : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
          }
          `}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          animate="exit"
        >
          <Link href="/" passHref>
            Go Home
          </Link>
        </motion.button>
      </main>
    </ProtectedPageAll>
  );
};

export default NewsletterMain;
