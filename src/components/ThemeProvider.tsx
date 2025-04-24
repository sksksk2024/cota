// ThemeProvider
'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/components/hooks/useThemeStore';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const res = await fetch('/api/session');
        const data = await res.json();
        if (typeof data.theme === 'string') {
          setTheme(data.theme as 'theme1' | 'theme2');
        }
      } catch (err) {
        console.error('Error loading user theme:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getTheme();
  }, [setTheme]);

  if (isLoading) return null; // Optional: Add a spinner here

  return (
    <div className={theme === 'theme1' ? 'bg-background-dark' : 'bg-cyan-dark'}>
      {children}
    </div>
  );
}
