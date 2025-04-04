'use client';

import { useThemeStore } from '@/components/store/useThemeStore';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useThemeStore();

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
