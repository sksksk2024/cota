'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/components/hooks/useUser';
import Spinner from '@/components/Spinner';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useEffect } from 'react';

export const ProtectedPageCustom = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { theme } = useThemeStore();
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div
        className={`w-full h-[100dvh] flex justify-center items-center m-auto
        ${theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}
      `}
      >
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};
