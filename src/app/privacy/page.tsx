'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import Link from 'next/link';
import CotaLogo from '@/components/svgs/CotaLogo';
import { useThemeStore } from '@/components/hooks/useThemeStore';

const NotFound = () => {
  const { theme } = useThemeStore();

  return (
    <main
      className={`overflow-y-clip min-h-[100dvh] flex flex-col justify-start items-center ${
        theme === 'theme1'
          ? 'text-white bg-deep-dark'
          : 'text-background-dark bg-green-cyan-light'
      }`}
    >
      <section
        className={`z-50 flex flex-col justify-center items-center gap-10 text-center p-16P py-32P pb-144P bg-cyanDark md:justify-around md:flex-row md:p-48P`}
      >
        <div className="group flex justify-around items-center w-full md:w-auto">
          <div className="w-64W  min-w-container-48">
            <CotaLogo />
          </div>
        </div>
        <h1
          className={`text-lg font-bold tracking-wide uppercase md:text-xl lg:text-2xl
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          Knowledge is key, everytime.
        </h1>
      </section>
      <section
        className={`relative flex flex-col justify-start items-center gap-10 px-32P pb-112P text-2xl text-center font-bold h-3/4
          
          `}
      >
        {/* Privacy Policy */}
        <div className="max-w-2xl mx-auto p-8 text-sm">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. What I Collect</h2>
            <ul className="pl-5 space-y-1">
              <li>
                <strong>For purchases:</strong> Email, name (via Stripe)
              </li>
              <li>
                <strong>For Google/Github login:</strong> Only your public
                profile info
              </li>
              <li>
                <strong>Automatically:</strong> Basic visitor analytics (no
                cookies)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 xl:text-xl">
              2. How I Use It
            </h2>
            <p className="text-md">Only to:</p>
            <ul className="pl-5 space-y-1">
              <li>Deliver purchased services</li>
              <li>Respond to your emails</li>
              <li>Improve my website (anonymous stats only)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 xl:text-xl">
              3. Data Sharing
            </h2>
            <p className="text-md">
              I <strong>never</strong> sell your data. Only shared with:
            </p>
            <ul className="pl-5 space-y-1">
              <li>Stripe (for payments)</li>
              <li>Render & Supabase (hosting analytics, anonymized)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-2 xl:text-xl">
              4. Your Rights
            </h2>
            <p className="text-md">You can:</p>
            <ul className="pl-5 space-y-1">
              <li>Request deletion of your data (email me)</li>
              <li>Opt out of non-essential cookies</li>
              <li>Disconnect social logins anytime</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 xl:text-xl">Contact</h2>
            <p className="text-md">
              For questions:{' '}
              <a
                href="mailto:cota8091@gmail.com"
                className={`underline
                ${theme === 'theme1' ? 'hover:text-warning' : 'hover:text-highlight'}
                `}
              >
                cota8091@gmail.com
              </a>
            </p>
          </section>
        </div>

        {/* HOME LINK */}
        <motion.button
          className={`z-50 w-full min-w-container-300 max-w-container-600 text-center text-md cursor-pointer p-16P rounded-5BR font-bold tracking-wide
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
          drag
          dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
          dragElastic={0.7}
        >
          <Link href="/" passHref>
            Go Home
          </Link>
        </motion.button>
      </section>
    </main>
  );
};

export default NotFound;
