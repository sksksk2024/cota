'use client';

import NewsletterMain from '@/components/NewsletterMain';
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
