// components/Spinner.tsx
import { motion, Variants } from 'framer-motion';

const Spinner = () => {
  const loadingVariants: Variants = {
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
    },
  };

  return (
    <motion.div
      className="container"
      variants={loadingVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="loader"
        drag
        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
        dragElastic={0.2}
      ></motion.div>
    </motion.div>
  );
};

export default Spinner;
