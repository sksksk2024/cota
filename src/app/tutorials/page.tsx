'use client';

import TutorialsMain from '@/components/TutorialsMain';
import { SessionProvider } from 'next-auth/react';

const Tutorials = () => {
  return (
    <SessionProvider>
      <TutorialsMain />
    </SessionProvider>
  );
};

export default Tutorials;
