'use client';

import DonationsMain from '@/components/privatePages/DonationsMain';
import PageWrapper from '@/components/PageWrapper';
import { SessionProvider } from 'next-auth/react';

const Donations = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <DonationsMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default Donations;
