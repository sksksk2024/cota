'use client';

import TutorialsMain from '@/components/privatePages/TutorialsMain';
import PageWrapper from '@/components/PageWrapper';
import { SessionProvider } from 'next-auth/react';

const Tutorials = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <TutorialsMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default Tutorials;
