'use client';

import { useRouter } from 'next/navigation';

type SignOutButtonProps = {
  contentClasses: string;
};

const SignOutButton = ({ contentClasses = '' }: SignOutButtonProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/signout', {
        method: 'GET',
        credentials: 'include',
      });

      console.log('Sign-out response:', response);

      router.push('/signin');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className={contentClasses}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
