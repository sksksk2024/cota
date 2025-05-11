'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import goalsMe from '@/images/goalsMe.webp';
import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import { comingMeVariants } from './motionVariants/motionVariants';

const Goals = () => {
  const { theme } = useThemeStore();

  return (
    <PageWrapper>
      <div className="flex flex-col justify-around items-center xl:flex-row">
        <div
          className={`flex flex-col justify-start items-start gap-10 px-32P xl:px-0 xl:max-w-1/2
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
        >
          <div className="z-50 space-y-5">
            <h2
              className={`text-2xl text-center font-bold xl:text-start
            `}
            >
              My Vision (Long Term)
            </h2>
            <p className="font-semibold tracking-widest">
              I have complex goals — and I know they sound ambitious. I want to:
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Build a platform that gives real recognition to overlooked
                  people: firefighters, soldiers, athletes, construction
                  workers.
                </li>
                <li>
                  Help shift how people see sports and physical discipline,
                  showing it&apos;s more than just a hobby — it&apos;s a
                  powerful career path.
                </li>
                <li>
                  Remove financial barriers, so that discipline driven and
                  talented people can reach development, no matter their
                  background.
                </li>
              </ul>
              <div className="my-32M">
                But I also know that none of that can happen without{' '}
                <span className="italic">action</span>. Currently, I&apos;m:
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li>Creating content to grow my audience on social media.</li>
                <li>
                  Practicing web development, making this website even more
                  accessible.
                </li>
                <li>
                  Writing consistent blogs to document my journey in
                  communication and self-expression.
                </li>
                <li>
                  Training mindfully in calisthenics to live the values I talk
                  about.
                </li>
              </ul>
              My ambitions are complex — but I&apos;m building the skills,
              mindset, and tools to reach them step by step.
            </p>
          </div>
          <div className="z-50 space-y-5">
            <h2
              className={`text-2xl text-center font-bold xl:text-start
            `}
            >
              Core Qualities
            </h2>
            <p className="font-semibold tracking-widest">
              I don&apos;t quit. I aim high - sometimes near impossibility -
              because{' '}
              <span className="italic">
                i enjoy the challenge of chasing results
              </span>
              . I don&apos;t pretend to have all the answers, but I do show up
              every day, ready to learn, improve, and take the next step.
            </p>
          </div>
        </div>
        <motion.div
          variants={comingMeVariants}
          initial="hidden"
          animate="visible"
          className="md:w-[700px] xl:w-full xl:max-w-container-700 absolute -bottom-32I xl:right-0"
        >
          <Image
            src={goalsMe}
            className="w-full pointer-events-none"
            alt="aboutMe"
          />
        </motion.div>
        <div className="w-128W h-1"></div>
      </div>
    </PageWrapper>
  );
};

export default Goals;
