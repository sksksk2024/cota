'use client';

import DonationsMain from '@/components/DonationsMain';
import { SessionProvider } from 'next-auth/react';

const Donations = () => {
  return (
    <SessionProvider>
      <DonationsMain />
    </SessionProvider>
  );
};

export default Donations;
