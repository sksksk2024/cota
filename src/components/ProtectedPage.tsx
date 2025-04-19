// components/ProtectedPage.tsx
import { useRouter } from 'next/navigation';
import { useUser } from '@/components/hooks/useUser';
import Spinner from '@/components/Spinner';
import { useThemeStore } from '@/components/hooks/useThemeStore';

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) {
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

  if (!user) {
    router.push('/signin');
    return null;
  }

  return <>{children}</>;
};
