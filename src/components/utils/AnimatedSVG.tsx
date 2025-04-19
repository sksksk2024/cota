'use client';

import { motion } from 'framer-motion';
import { svgVariants, pathVariants } from '../motionVariants/motionVariants';
import { useThemeStore } from '../hooks/useThemeStore';
import { ReactNode } from 'react';

type AnimatedSVGProps = {
  pathData: string;
  label: string;
  onClick?: () => void;
  height?: number;
  width?: number;
  className?: string;
  strokeWidth?: number;
  viewBox?: string;
  children?: ReactNode;
  stroke?: string;
  fill?: string;
};

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({
  pathData,
  label,
  width = 24,
  height = 24,
  strokeWidth = 2,
  viewBox,
  className = '',
  children,
  onClick,
  stroke,
  fill,
}) => {
  const { theme } = useThemeStore();

  return (
    <div className="group cursor-pointer" aria-label={label} role="button">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        d={pathData}
        width={width}
        height={height}
        viewBox={viewBox || '0 0 24 24'}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="currentColor"
        className={`${className} transition duration-0
          ${
            theme === 'theme1'
              ? 'fill-white group-hover:fill-warning'
              : 'fill-black group-hover:fill-highlight'
          }
          `}
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <motion.path
          d={pathData}
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedSVG;
