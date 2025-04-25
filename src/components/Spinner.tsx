// components/Spinner.tsx
import { motion } from 'framer-motion';
import { loadingVariants } from './motionVariants/motionVariants';

const Spinner = () => {
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
