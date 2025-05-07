'use client';

import PageWrapper from '@/components/PageWrapper';
import LeaderboardMain from '@/components/privatePages/LeaderboardMain';
import { SessionProvider } from 'next-auth/react';

const Leaderboard = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <LeaderboardMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default Leaderboard;
