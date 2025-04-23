'use client';

import TappyMain from '@/components/privatePages/TappyMain';
import PageWrapper from '@/components/PageWrapper';
import { SessionProvider } from 'next-auth/react';

const Tappy = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <TappyMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default Tappy;
