'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/components/hooks/useThemeStore';
import { useSession } from 'next-auth/react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useThemeStore(); // Zustand store
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  // Fetch theme initially
  useEffect(() => {
    let isMounted = true;

    const getTheme = async () => {
      try {
        const res = await fetch('/api/theme');
        const data = await res.json();
        if (isMounted && typeof data.theme === 'string') {
          setTheme(data.theme);
        }
      } catch (err) {
        console.error('Error loading user theme:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    getTheme();

    return () => {
      isMounted = false;
    };
  }, [setTheme]);

  // Update theme when session changes
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.theme) {
      setTheme(session.user.theme);
    }
  }, [status, session, setTheme]);

  // 🛠️ NEW: Update the <body> class based on theme
  useEffect(() => {
    if (!isLoading) {
      document.body.classList.remove('bg-background-dark', 'bg-cyan-dark');
      document.body.classList.add(
        theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'
      );
    }
  }, [theme, isLoading]);

  if (isLoading) {
    return null;
  }

  // ❌ Don't wrap children with a div anymore
  return <>{children}</>;
}
