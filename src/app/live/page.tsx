'use client';

import LiveMain from '@/components/privatePages/LiveMain';
import PageWrapper from '@/components/PageWrapper';
import { SessionProvider } from 'next-auth/react';

const Live = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <LiveMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default Live;
