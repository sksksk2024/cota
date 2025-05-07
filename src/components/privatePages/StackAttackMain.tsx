'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedPageAll from '../ProtectedPageAll';

const StackAttackMain = () => {
  const { theme } = useThemeStore();

  let [goalWord, setGoalWord] = useState<string>('StackAttack');
  let [word, setWord] = useState<string>('StackAttackk');
  let [score, setScore] = useState<number>(0);

  // FETCH NEW WORD
  const fetchWord = async () => {
    const res = await fetch(
      'https://random-word-api.herokuapp.com/word?number=1'
    );
    const data = await res.json();
    setGoalWord(data[0]);
  };

  // ONCE PUSHED OR POPED, VERIFY THAT THE GOAL WORD IS EQUAL TO INPUT WORD
  useEffect(() => {
    if (word === goalWord) {
      console.log('YOU WIN!');
      handleScore();
    }
  }, [word, goalWord]);

  useEffect(() => {});

  const handleScore = () => {
    setScore((prev) => prev + 1);
    fetchWord();
  };

  //   PUSH FUNCTION
  const pushWord = () => {
    if (word.length >= 64) {
      console.error(`You can't add any more letters!`);
    } else {
      let stringArr = [];
      for (let i = 0; i < word.length; ++i) {
        stringArr.push(word[i]);
      }

      const option = Math.floor(Math.random() * 2);

      const letterIndex = Math.round(Math.random() * 26);
      let AsciiStart = 97; // a lowercase

      if (option !== 0) {
        AsciiStart = 65; // A uppercase
      }
      let number = AsciiStart + letterIndex;

      if (number === 123 || number === 91) {
        number = number - 1;
      }

      const letter = String.fromCharCode(number);

      stringArr = [...stringArr, letter];
      const newWord = stringArr.join('');
      setWord(newWord);
    }
  };

  // POP FUNCTION
  const popWord = () => {
    if (word.length <= 0) {
      console.error(`You can't remove any more letters.`);
    } else {
      let stringArr = [];
      for (let i = 0; i < word.length - 1; ++i) {
        stringArr.push(word[i]);
      }
      console.log(stringArr);
      const newWord = stringArr.join('');
      setWord(newWord);
    }
  };

  return (
    <ProtectedPageAll>
      <div
        className={`w-full min-h-[100dvh] my-auto flex flex-col justify-center items-center gap-10 px-16P py-48P md:px-64P
    ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
  `}
      >
        <header className="flex flex-col justify-center items-center gap-4 text-white max-w-container-600">
          <h1 className="text-xl font-bold text-center">
            Stack Attack! Attack every letter, they are your enemy, or your
            friend. Be contious.
          </h1>
          <div className="text-lg">Score: {score}</div>
        </header>

        <main className="flex flex-col justify-center items-center gap-5 w-full min-w-container-300 max-w-container-600">
          <h2>
            Goal Word:
            <span
              className={`ml-4M
            ${theme === 'theme1' ? 'text-warning' : 'text-highlight'}
            `}
            >
              {goalWord}
            </span>
          </h2>
          <div className="flex flex-col justify-center items-center min-w-container-300 w-full max-w-container-600 text-center border border-white py-16P rounded-5BR">
            <h2 className="text-center w-full min-w-container-300 max-w-container-600">
              {word}
            </h2>
          </div>
          <div className="flex justify-center items-center gap-5 min-w-container-300 w-full max-w-container-600">
            <button
              onClick={pushWord}
              className={`w-1/2 cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
          `}
            >
              Push
            </button>
            <button
              onClick={popWord}
              className={`w-1/2 cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
          `}
            >
              Pop
            </button>
          </div>
        </main>

        <footer className="flex justify-center items-center w-full">
          {/* GO BACK TO GAMES */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="exit"
            whileHover="hover"
            className={`w-full min-w-container-300 max-w-container-600 cursor-pointer p-16P rounded-5BR font-bold tracking-wide
            ${
              theme === 'theme1'
                ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
            }
          `}
          >
            <Link href="/games" passHref>
              Go To Games
            </Link>
          </motion.button>
        </footer>
      </div>
    </ProtectedPageAll>
  );
};

export default StackAttackMain;
