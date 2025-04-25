'use client';

import { useToast } from './hooks/useToast';
import { useRouter } from 'next/navigation';

type SignOutButtonProps = {
  contentClasses: string;
};

const SignOutButton = ({ contentClasses = '' }: SignOutButtonProps) => {
  const { success, error, loading, dismiss } = useToast();

  const router = useRouter();

  const handleSignOut = async () => {
    loading('Signing Out...');
    try {
      await fetch('/api/signout', {
        method: 'GET',
        credentials: 'include',
      });

      dismiss();

      success('Successfully Signed Out!');
      router.push('/signin');
    } catch (err) {
      error(`Something Went Wrong: ${err}`);
    }
  };

  return (
    <button onClick={handleSignOut} className={contentClasses}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
