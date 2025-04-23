import { Variants } from 'framer-motion';

export const comingVariants: Variants = {
  hidden: {
    translateX: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  visible: {
    translateX: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export const piggyWiggle: Variants = {
  initial: { rotate: 0 },
  hover: {
    scale: [1, 1.01, 1.05, 1.07],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
  tap: {
    rotate: [0, -10, 10, -8, 8, -5, 5, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

export const sunVariants: Variants = {
  initial: {
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  hover: {
    rotate: 180,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

export const moonVariants: Variants = {
  initial: {
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
  hover: {
    rotate: 360,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

export const svgVariants: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  hover: {
    scale: 1.1,
    rotate: -10,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

export const pathVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export const buttonVariants: Variants = {
  hidden: {
    scale: 1,
  },
  hover: {
    scale: [1, 1.01, 1.05, 1.07],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
  exit: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
};

export const mainButtonVariants: Variants = {
  hidden: {
    scale: 1,
  },
  hover: {
    scale: 1.04,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

export const inputVariants: Variants = {
  hidden: {
    scale: 1,
  },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export const loadingVariants: Variants = {
  hidden: {
    scale: 0.6,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeIn',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

export const openedEyeVariants = {
  visible: { scaleY: 1 },
  blink: {
    scaleY: [1, 0.1, 1], // squish vertically
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export const closedEyeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const lockedVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  hover: {
    rotate: [0, -5, 5, -3, 3, 0],
    transition: { duration: 0.4 },
  },
};

export const unlockedVariants: Variants = {
  hidden: { opacity: 0, rotate: -30, y: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 250, damping: 18 },
  },
};
