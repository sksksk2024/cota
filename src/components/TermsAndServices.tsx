import Link from 'next/link';
import React from 'react';
import { useThemeStore } from './hooks/useThemeStore';
import { useTranslation } from './hooks/useTranslation';

const TermsAndServices = () => {
  const { t } = useTranslation();

  const { theme } = useThemeStore();

  return (
    <div
      className={`text-xs text-center opacity-80 mt-8 mb-4
    ${theme === 'theme1' ? 'text-white' : 'text-textis'}
    `}
    >
      <p>
        © {new Date().getFullYear()} {t('footer.copyright1')}
      </p>
      <p className="mt-2">
        {t('footer.copyright2')}{' '}
        <Link
          href="/terms"
          className={`underline 
            ${theme === 'theme1' ? 'hover:text-warning' : 'hover:text-highlight'}
            `}
        >
          {t('footer.copyright3')}
        </Link>{' '}
        {t('footer.between')}{' '}
        <Link
          href="/privacy"
          className={`underline 
            ${theme === 'theme1' ? 'hover:text-warning' : 'hover:text-highlight'}
            `}
        >
          {t('footer.copyright4')}
        </Link>
        {t('footer.copyright5')}
      </p>
    </div>
  );
};

export default TermsAndServices;
