// hooks/useThemeStore.ts
'use client';

import { create } from 'zustand';
import { useUser } from './useUser';
import { useSession } from 'next-auth/react';
import { useToast } from './useToast';

type ThemeState = {
  theme: 'theme1' | 'theme2';
  setTheme: (theme: 'theme1' | 'theme2') => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'theme1', // Default theme
  setTheme: (theme) => set({ theme }),
  toggleTheme: async () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'theme1' ? 'theme2' : 'theme1';

    const { error } = useToast();

    const { user } = useUser();
    const { data: session } = useSession();

    set({ theme: newTheme }); // Update state

    try {
      if (session?.user?.email || user?.email) {
        await fetch('/api/theme', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ theme: newTheme }),
        });
      } else {
        error('You must sign up if you want to change the theme!');
      }
    } catch (error) {
      console.error('Failed to update theme on server:', error);
    }
  },
}));
