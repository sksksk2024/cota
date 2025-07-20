// hooks/useTranslation.ts
import { useLanguageStore } from './useLanguageStore';
import en from '@/languages/en.json';
import ro from '@/languages/ro.json';

type DeepStringRecord = {
  [key: string]: string | string[] | DeepStringRecord;
};

export const useTranslation = () => {
  const { language } = useLanguageStore();

  const translations: DeepStringRecord = language === 'ro' ? ro : en;

  // Helper function to replace placeholders (e.g., {name})
  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      if (typeof value !== 'object' || value === null) return key;
      value = (value as Record<string, unknown>)[k];
      if (value === undefined) return key;
    }

    if (Array.isArray(value)) {
      return value.join(', '); // Or handle arrays differently
    }

    if (typeof value !== 'string') return key;

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
