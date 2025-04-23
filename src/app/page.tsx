'use client';

import HomeMain from '@/components/privatePages/HomeMain';
import { SessionProvider } from 'next-auth/react';
import PageWrapper from '@/components/PageWrapper';

const Home = () => {
  return (
    <>
      <SessionProvider>
        <PageWrapper>
          <HomeMain />
        </PageWrapper>
      </SessionProvider>
    </>
  );
};

export default Home;
