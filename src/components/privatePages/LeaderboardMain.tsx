'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { buttonVariants } from '../motionVariants/motionVariants';
import { motion } from 'framer-motion';

type Game = 'tappy' | 'maze' | 'stackattack';

type ScoreEntry = {
  id: string;
  username: string;
  score: number;
};

const LeaderboardMain = () => {
  const { theme } = useThemeStore();
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game>('tappy');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(`/api/highscore/${selectedGame}`);
        const data = await res.json();

        if (!res.ok) {
          console.error(
            `Failed to fetch ${selectedGame} scores:`,
            data.message
          );
          setScores([]);
        } else {
          setScores(data.scores || []);
        }
      } catch (err) {
        console.error('Error fetching scores:', err);
        setScores([]);
      }
    };

    fetchScores();
  }, [selectedGame]);

  return (
    <div
      className={`min-h-screen py-32P px-16P flex flex-col items-center gap-10
        ${theme === 'theme1' ? 'bg-background-dark text-white' : 'bg-cyan-dark text-background-dark'}
      `}
    >
      <h1
        className={`text-2xl text-center font-bold
        ${theme === 'theme1' ? 'text-white' : 'text-textis'}
        `}
      >
        🏆 {selectedGame.toUpperCase()} Leaderboard
      </h1>

      {/* Game Switcher */}
      <div className="flex gap-4 mb-4">
        {(['tappy', 'maze', 'stack attack'] as Game[]).map((game) => (
          <motion.button
            key={game}
            onClick={() => setSelectedGame(game)}
            variants={buttonVariants}
            initial="hidden"
            whileHover="hover"
            className={`px-16P py-8P rounded-5BR cursor-pointer font-bold tracking-wide uppercase
                              ${
                                theme === 'theme1'
                                  ? 'text-white bg-green-dark hover:text-background-dark hover:bg-warning'
                                  : ' bg-green-light text-background-dark hover:text-cyan-dark hover:bg-highlight'
                              }
                              `}
          >
            {game.toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* Score List */}
      <ul
        className={`w-full max-w-container-600
        ${theme === 'theme1' ? 'text-white' : 'text-textis'}
        `}
      >
        {scores.length === 0 ? (
          <li className="text-center">No scores yet.</li>
        ) : (
          scores.map((entry, index) => (
            <li
              key={entry.id}
              className="flex justify-between p-12P border-b border-gray-400"
            >
              <span>
                #{index + 1} {entry.username}
              </span>
              <span>{entry.score}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LeaderboardMain;
