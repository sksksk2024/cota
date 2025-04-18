'use client';

import HomeMain from '@/components/HomeMain';
import { SessionProvider } from 'next-auth/react';

const Home = () => {
  return (
    <>
      <SessionProvider>
        <HomeMain />
      </SessionProvider>
    </>
  );
};

export default Home;
