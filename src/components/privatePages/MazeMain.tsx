'use client';

import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/motionVariants/motionVariants';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/hooks/useToast';
import ProtectedPageAll from '../ProtectedPageAll';

type Position = {
  x: number;
  y: number;
};

const generateMaze = (
  rows: number,
  cols: number
): {
  maze: string[][];
  start: Position;
  goal: Position;
} => {
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ' ')
  );

  // Outer walls
  for (let i = 0; i < rows; ++i) {
    maze[i][0] = '#';
    maze[i][cols - 1] = '#';
  }
  for (let j = 0; j < cols; ++j) {
    maze[0][j] = '#';
    maze[rows - 1][j] = '#';
  }

  // Random internal walls
  for (let i = 0; i < Math.floor((rows * cols) / 4); i++) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    if (maze[y][x] === ' ') {
      maze[y][x] = '#';
    }
  }

  const getRandomEmptyCell = (): Position => {
    let x = 0,
      y = 0;
    do {
      x = Math.floor(Math.random() * cols);
      y = Math.floor(Math.random() * rows);
    } while (maze[y][x] !== ' ');
    return { x, y };
  };

  const start = getRandomEmptyCell();
  const goal = getRandomEmptyCell();
  while (goal.x === start.x && goal.y === start.y) {
    Object.assign(goal, getRandomEmptyCell());
  }

  maze[start.y][start.x] = 'S';
  maze[goal.y][goal.x] = 'G';

  return { maze, start, goal };
};

const MazeMain = () => {
  const { theme } = useThemeStore();
  const [maze, setMaze] = useState<string[][]>([]);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [, setGoalPos] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState<number>(0);
  const { success, error } = useToast();

  const createNewMaze = () => {
    const rows = 15;
    const cols = 20;
    const { maze, start, goal } = generateMaze(rows, cols);
    setMaze(maze);
    setPlayerPos(start);
    setGoalPos(goal);
  };

  useEffect(() => {
    createNewMaze();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      let newX = playerPos.x;
      let newY = playerPos.y;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          newY -= 1;
          break;
        case 'ArrowDown':
        case 's':
          newY += 1;
          break;
        case 'ArrowLeft':
        case 'a':
          newX -= 1;
          break;
        case 'ArrowRight':
        case 'd':
          newX += 1;
          break;
        default:
          return;
      }

      const targetCell = maze[newY]?.[newX];
      if (targetCell && targetCell !== '#') {
        setPlayerPos({ x: newX, y: newY });

        if (targetCell === 'G') {
          success('🎉 You reached the goal!');
          setScore((prev) => prev + 1);
          createNewMaze(); // restart with a new maze
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [playerPos, maze]);

  useEffect(() => {
    // Save score
    const saveScore = async () => {
      try {
        const res = await fetch('/api/highscore/maze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ score }),
        });

        const data = await res.json();

        if (!res.ok) {
          error(`Failed to save score: ${data.message}`);
        } else {
          success('Score saved successfully');
        }
      } catch (err) {
        error(`Error saving score: ${err}`);
      }
    };

    saveScore();
  }, [score]);

  const getCellColor = (cell: string, isPlayer: boolean) => {
    if (isPlayer) return 'bg-blue-500';
    if (cell === '#') return 'bg-gray-500';
    if (cell === ' ' || cell === 'S') return 'bg-green-500';
    if (cell === 'G') return 'bg-yellow-500';
    return 'bg-white';
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
            Maze! Be fast, and accurate.
          </h1>
          <div className="text-lg">Score: {score}</div>
        </header>

        <main className="flex flex-col justify-center items-center gap-5 w-full min-w-container-300 max-w-container-600">
          {maze.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${maze[0].length}, minmax(3vw, 2.5rem))`,
              }}
              className="gap-1"
            >
              {maze.map((row, y) =>
                row.map((cell, x) => {
                  const isPlayer = playerPos.x === x && playerPos.y === y;
                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`aspect-square ${getCellColor(cell, isPlayer)}`}
                    />
                  );
                })
              )}
            </div>
          )}
        </main>

        <footer className="flex flex-col gap-4 justify-center items-center w-full">
          {/* Restart Button */}
          <motion.button
            onClick={createNewMaze}
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
            Restart
          </motion.button>

          {/* Go To Games Button */}
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

export default MazeMain;
