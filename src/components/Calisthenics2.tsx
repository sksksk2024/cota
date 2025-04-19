'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Calithenics = () => {
  const ref = useRef(null);

  // Scroll progress for this component
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'], // start at top of screen, end at top of screen
  });

  // Make it move slowly upward
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section className="relative h-[200vh]" ref={ref}>
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="w-[400px] h-[400px] bg-green-500 rounded-full"
        />
      </div>
    </section>
  );
};

export default Calithenics;
