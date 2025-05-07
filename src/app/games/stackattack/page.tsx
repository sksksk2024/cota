'use client';

import StackAttackMain from '@/components/privatePages/StackAttackMain';
import PageWrapper from '@/components/PageWrapper';
import { SessionProvider } from 'next-auth/react';

const StackAttack = () => {
  return (
    <SessionProvider>
      <PageWrapper>
        <StackAttackMain />
      </PageWrapper>
    </SessionProvider>
  );
};

export default StackAttack;
