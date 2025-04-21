'use client';

import GamesMain from '@/components/GamesMain';
import { SessionProvider } from 'next-auth/react';

const Games = () => {
  return (
    <SessionProvider>
      <GamesMain />
    </SessionProvider>
  );
};

export default Games;
