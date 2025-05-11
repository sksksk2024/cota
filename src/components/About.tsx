'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import aboutMe from '@/images/aboutMe.webp';
import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';
import { comingMeVariants } from './motionVariants/motionVariants';

const About = () => {
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
              className={`text-2xl text-center font-bold mx-auto xl:text-start xl:mx-0
            `}
            >
              About Me and What I Do
            </h2>
            <p className="font-semibold tracking-widest">
              I&apos;m <span className="font-bold italic">Cota Alexandru</span>,
              an 18-year-old who{' '}
              <span className="italic">loves challenges</span> and and lives to
              grow. I&apos;ve spent over 2.5 years in{' '}
              <span className="italic">calisthenics</span>, in which i built I
              built both physical and mental strength, and 1.5+ years in{' '}
              <span className="italic">web development</span>, where I found a
              creative way to express ideas and create something meaningful. I
              recently launched my professional website to{' '}
              <span className="italic">start my own business</span> — one that
              combines my passion for fitness, tech, and helping others. My
              mission is to create content, tools, and opportunities that will
              not only inspire, but have{' '}
              <span className="italic">people push past their limits</span>,
              just like I try to do every day.
            </p>
          </div>
        </div>
        <motion.div
          variants={comingMeVariants}
          initial="hidden"
          animate="visible"
          className="md:w-[500px] xl:w-full xl:max-w-container-800 absolute -bottom-32I xl:right-0"
        >
          <Image
            src={aboutMe}
            className="w-full pointer-events-none"
            alt="aboutMe"
          />
        </motion.div>
        <div className="w-128W h-1"></div>
      </div>
    </PageWrapper>
  );
};

export default About;
