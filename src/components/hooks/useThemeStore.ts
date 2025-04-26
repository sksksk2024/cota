// hooks/useThemeStore.ts
'use client';

import { create } from 'zustand';

type ThemeState = {
  theme: 'theme1' | 'theme2';
  setTheme: (theme: 'theme1' | 'theme2') => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'theme1',
  setTheme: (theme) => set({ theme }),
}));
