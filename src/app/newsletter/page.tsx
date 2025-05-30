'use client';

import NewsletterMain from '@/components/privatePages/NewsletterMain';
import PageWrapper from '@/components/PageWrapper';
import { SessionProvider } from 'next-auth/react';

const Newsletter = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <NewsletterMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default Newsletter;
