'use client';

import GamesMain from '@/components/GamesMain';
import PageWrapper from '@/components/PageWrapper';
import { SessionProvider } from 'next-auth/react';

const Games = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <GamesMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default Games;
