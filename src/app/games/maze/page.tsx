'use client';

import MazeMain from '@/components/privatePages/MazeMain';
import PageWrapper from '@/components/PageWrapper';
import { SessionProvider } from 'next-auth/react';

const Maze = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <MazeMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default Maze;
