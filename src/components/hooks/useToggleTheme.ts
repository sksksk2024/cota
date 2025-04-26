'use client';

import { useUser } from './useUser';
import { useSession } from 'next-auth/react';
import { useToast } from './useToast';
import { useEffect, useCallback } from 'react';
import { useThemeStore } from './useThemeStore';

export const useToggleTheme = () => {
  const { theme, setTheme } = useThemeStore();
  const { error } = useToast();
  const { user } = useUser();
  const { data: session } = useSession();

  // 🛠 Move fetchTheme OUTSIDE useEffect
  const fetchTheme = useCallback(async () => {
    try {
      const res = await fetch('/api/theme', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.theme === 'theme1' || data.theme === 'theme2') {
        setTheme(data.theme);
      }
    } catch (err) {
      console.error('Failed to fetch theme:', err);
    }
  }, [setTheme]);

  useEffect(() => {
    fetchTheme(); // Fetch once on mount
  }, [fetchTheme]);

  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'theme1' ? 'theme2' : 'theme1';
    setTheme(newTheme);

    try {
      const email = session?.user?.email || user?.email;

      if (!email) {
        error('You must sign up if you want to change the theme!');
        return;
      }

      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: newTheme }),
      });

      await fetchTheme(); // ✅ Now it exists here too

      if (!res.ok) {
        throw new Error('Failed to update theme on server.');
      }

      // 🔥 Optional re-fetch after 3 seconds
      setTimeout(async () => {
        await fetchTheme();
      }, 3000);
    } catch (err) {
      console.error('Failed to update theme:', err);
      error('Could not update your theme. Please try again.');
    }
  }, [theme, session?.user?.email, user?.email, setTheme, error, fetchTheme]);

  return toggleTheme;
};
