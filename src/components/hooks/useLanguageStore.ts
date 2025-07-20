// stores/languageStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type language = 'ro' | 'en';

interface LanguageState {
  language: language;
  toggleLanguage: () => void;
}

// export const useLanguageStore = create<LanguageState>((set) => ({
//   language: 'en',
//   toggleLanguage: () =>
//     set((state) => ({ language: state.language === 'en' ? 'ro' : 'en' })),
// }),
// {
//       name: 'language-storage', // unique name for localStorage
//     });

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      toggleLanguage: () =>
        set((state) => ({ language: state.language === 'en' ? 'ro' : 'en' })),
    }),
    {
      name: 'language-storage', // unique name for localStorage
    }
  )
);
