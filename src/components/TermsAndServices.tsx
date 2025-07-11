import Link from 'next/link';
import React from 'react';
import { useThemeStore } from './hooks/useThemeStore';

const TermsAndServices = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={`text-xs text-center opacity-80 mt-8 mb-4
    ${theme === 'theme1' ? 'text-white' : 'text-textis'}
    `}
    >
      <p>© {new Date().getFullYear()} Alexandru Coța. All rights reserved.</p>
      <p className="mt-2">
        By using this site, you agree to our{' '}
        <Link
          href="/terms"
          className={`underline 
            ${theme === 'theme1' ? 'hover:text-warning' : 'hover:text-highlight'}
            `}
        >
          Terms
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className={`underline 
            ${theme === 'theme1' ? 'hover:text-warning' : 'hover:text-highlight'}
            `}
        >
          Privacy Policy
        </Link>
        . Purchases are non-refundable digital services.
      </p>
    </div>
  );
};

export default TermsAndServices;
