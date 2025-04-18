import { create } from 'zustand';

type ThemeState = {
  theme: 'theme1' | 'theme2';
  setTheme: (theme: 'theme1' | 'theme2') => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'theme1',
  setTheme: (theme) => set({ theme }),
  toggleTheme: async () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'theme1' ? 'theme2' : 'theme1';

    set({ theme: newTheme });

    try {
      await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (error) {
      console.error('Failed to update theme on server:', error);
    }
  },
}));
