'use client';

import LiveMain from '@/components/LiveMain';
import { SessionProvider } from 'next-auth/react';

const Live = () => {
  return (
    <SessionProvider>
      <LiveMain />
    </SessionProvider>
  );
};

export default Live;
