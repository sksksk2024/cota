'use client';

import NewsletterMain from '@/components/NewsletterMain';
import { SessionProvider } from 'next-auth/react';

const Newsletter = () => {
  return (
    <SessionProvider>
      <NewsletterMain />
    </SessionProvider>
  );
};

export default Newsletter;
