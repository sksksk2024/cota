'use client';

import Image from 'next/image';
import logo from './../app/favicon.ico';
import { useThemeStore } from './hooks/useThemeStore';
import PageWrapper from './PageWrapper';

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
          <div className="space-y-5">
            <h2
              className={`text-2xl text-center font-bold mx-auto xl:text-start xl:mx-0
            `}
            >
              About Me and What I Do?
            </h2>
            <p className="font-semibold tracking-widest">
              I’m <span className="font-bold italic">Cota Alexandru</span>, an
              18-year-old passionate about{' '}
              <span className="italic">overcoming challenges</span> and
              improving myself every day. From my early days in{' '}
              <span className="italic">calisthenics</span> to my transition into{' '}
              <span className="italic">web development</span>, I’ve always
              sought to find new ways to push my limits. Web development started
              as a tool for building my business, but it quickly became my{' '}
              <span className="italic">passion</span>. I want to use my skills
              to create a business that not only helps me, but also promotes the
              recognition of those who often go unnoticed. My vision is to
              empower others by breaking down{' '}
              <span className="italic">financial barriers</span> and providing
              opportunities for growth, regardless of one's background.
            </p>
          </div>
        </div>
        <div className="relative translate-y-1/2">
          <Image src={logo} className="w-full" alt="logo" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
