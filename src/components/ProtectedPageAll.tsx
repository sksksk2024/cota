'use client';

import { ReactNode, useEffect } from 'react';
import { useUser } from './hooks/useUser';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';
import { useThemeStore } from './hooks/useThemeStore';

type Props = {
  children: ReactNode;
};

export default function ProtectedPageAllUsers({ children }: Props) {
  const { theme } = useThemeStore();
  const { user, loading } = useUser();
  const router = useRouter();
  const session = useSession();

  const isCustomUser = user ? user : null;
  const isSessionUser = session?.data?.user?.email
    ? session?.data?.user?.email
    : null;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loading && !isCustomUser && !isSessionUser) {
        router.push('/signin');
      }
    }, 5000);

    // Clean up the timeout if data loads in the meantime
    if (isCustomUser || isSessionUser) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [loading, isCustomUser, isSessionUser, router]);

  if (loading || (!isCustomUser && !isSessionUser)) {
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
}
