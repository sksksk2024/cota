// translationHelper.ts
import en from '@/languages/en.json';
import ro from '@/languages/ro.json';
import { useLanguageStore } from './useLanguageStore';

type DeepStringRecord = {
  [key: string]: string | string[] | DeepStringRecord;
};

export const createTranslations = () => {
  const language = useLanguageStore.getState().language;
  const translations: DeepStringRecord = language === 'ro' ? ro : en;

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
