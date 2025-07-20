// hooks/useTranslation.ts
import { useLanguageStore } from './useLanguageStore';
import en from '@/languages/en.json';
import ro from '@/languages/ro.json';

type Translations = typeof en; // Use English as the base type

export const useTranslation = () => {
  const { language } = useLanguageStore();

  const translations: Translations = language === 'ro' ? ro : en;

  // Helper function to replace placeholders (e.g., {name})
  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value[k];
      if (value === undefined) return key; // Fallback to key if not found
    }

    if (params) {
      return Object.entries(params).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, v),
        value
      );
    }

    return value;
  };

  return { t };
};
