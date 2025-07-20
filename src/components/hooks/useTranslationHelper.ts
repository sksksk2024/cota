// translationHelper.ts
import en from '@/languages/en.json';
import ro from '@/languages/ro.json';
import { useLanguageStore } from './useLanguageStore';

export const createTranslations = () => {
  const language = useLanguageStore.getState().language;
  const translations = language === 'ro' ? ro : en;

  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value[k];
      if (value === undefined) return key;
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
