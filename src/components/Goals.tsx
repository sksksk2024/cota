'use client';

import Image from 'next/image';
import logo from './../app/favicon.ico';
import { useThemeStore } from './hooks/useThemeStore';

const Goals = () => {
  const { theme } = useThemeStore();

  return (
    <div className="flex flex-col justify-around items-center xl:flex-row">
      <div
        className={`flex flex-col justify-start items-start gap-10 px-32P xl:px-0 xl:max-w-1/2
            ${theme === 'theme1' ? 'text-white' : 'text-textis'}
            `}
      >
        <div className="space-y-5">
          <h2
            className={`text-2xl text-center font-bold xl:text-start
            `}
          >
            Qualities
          </h2>
          <p className="font-semibold tracking-widest">
            <span className="italic">Determination</span> and{' '}
            <span className="italic">resilience</span> define my approach to
            life. I’m not afraid to take risks or tackle challenges{' '}
            <span className="italic">head-on</span>. I value{' '}
            <span className="italic">hard work</span>, both physically and
            mentally, and strive to be someone who doesn’t settle for
            mediocrity. Through my journey in{' '}
            <span className="italic">calisthenics</span>,{' '}
            <span className="italic">entrepreneurship</span>, and{' '}
            <span className="italic">web development</span>, I’ve learned to
            embrace failure as a lesson and keep moving forward. My commitment
            to <span className="italic">self-improvement</span> drives me to
            constantly evolve, learn, and grow, ensuring that I can contribute
            positively to both my personal and professional communities.
          </p>
        </div>
        <div className="space-y-5">
          <h2
            className={`text-2xl text-center font-bold xl:text-start
            `}
          >
            Goals for 2025
          </h2>
          <p className="font-semibold tracking-widest">
            In 2025, my primary focus is on{' '}
            <span className="italic">personal</span> and{' '}
            <span className="italic">professional growth</span>. I aim to deepen
            my <span className="italic">web development skills</span> while
            building a business that empowers others. I want to create a
            platform to celebrate unsung heroes—those who risk their lives in
            physically demanding jobs like{' '}
            <span className="italic">firefighters</span>,{' '}
            <span className="italic">soldiers</span>, and{' '}
            <span className="italic">construction workers</span>. My goal is
            also to change how society views{' '}
            <span className="italic">sports</span> and athletes, promoting it as
            a viable career path. Through these endeavors, I hope to contribute
            to a world where <span className="italic">financial stress</span>{' '}
            doesn't dictate people's lives, allowing them to live freely and
            pursue their passions.
          </p>
        </div>
      </div>
      <div className="relative translate-y-1/2">
        <Image src={logo} className="w-full" alt="logo" />
      </div>
    </div>
  );
};

export default Goals;
