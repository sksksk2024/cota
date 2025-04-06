'use client';

import { motion, Variants } from 'framer-motion';
import { useThemeStore } from '../hooks/useThemeStore';

type AnimatedSVGProps = {
  pathData: string;
  label: string;
  onClick?: () => void;
  height: number;
  width: number;
};

const svgVariants: Variants = {
  hidden: { rotate: -360 },
  visible: {
    rotate: 0,
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: 20,
      repeatType: 'reverse',
    },
  },
};

const pathVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({
  pathData,
  label,
  width = 24,
  height = 24,
}) => {
  const { theme } = useThemeStore();

  return (
    <div className="group cursor-pointer" aria-label={label} role="button">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        className={`transition duration-300
          ${
            theme === 'theme1'
              ? 'fill-white group-hover:fill-warning'
              : 'fill-black group-hover:fill-highlight'
          }
          `}
        // variants={svgVariants}
        initial="hidden"
        animate="visible"
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
