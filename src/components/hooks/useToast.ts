'use client';

import { toast } from 'react-hot-toast';
import { useThemeStore } from './useThemeStore';

export const useToast = () => {
  const { theme } = useThemeStore();

  const base =
    theme === 'theme1' ? 'text-white bg-deep-dark' : 'text-textis bg-cyan-dark';

  const toastClass: string = 'font-bold px-4 py-3 rounded-xl shadow-xl';

  const success = (message: string) =>
    toast.success(message, {
      duration: 4000,
      className: `${toastClass} ${base}`,
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff',
      },
    });

  const error = (message: string) =>
    toast.error(message, {
      duration: 5000,
      className: `${toastClass} ${base}`,
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    });

  const loading = (message: string) =>
    toast.loading(message, {
      duration: 2000,
      className: `${toastClass} ${base}`,
    });

  const dismiss = () => toast.dismiss();

  return {
    success,
    error,
    loading,
    dismiss,
  };
};
