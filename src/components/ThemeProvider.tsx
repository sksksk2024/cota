'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/components/hooks/useThemeStore';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const getTheme = async () => {
      try {
        const res = await fetch('/api/session'); // You’ll need to return theme here
        const data = await res.json();
        if (typeof data.theme === 'string') {
          setTheme(data.theme as 'theme1' | 'theme2');
        }
      } catch (err) {
        console.error('Error loading user theme:', err);
      }
    };

    getTheme();
  }, [setTheme]);

  return (
    <div
      className={
        theme === 'theme1' ? 'bg-backgroundDark' : 'bg-backgroundLight'
      }
    >
      {children}
    </div>
  );
}
