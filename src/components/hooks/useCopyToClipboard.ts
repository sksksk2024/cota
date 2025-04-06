import { useState } from 'react';

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2sec
    } catch (err) {
      console.error('Failed to copy!', err);
      setCopied(false);
    }
  };

  return { copy, copied };
};
