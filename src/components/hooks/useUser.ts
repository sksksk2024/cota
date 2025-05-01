'use client';

import { useState, useEffect } from 'react';
import { User, Account, Session } from '@prisma/client';

type UserType = User & {
  accounts: Account[];
  sessions: Session[];
};

export const useUser = () => {
  const [user, setUser] = useState<UserType>({
    id: '',
    name: null,
    email: null,
    password: null,
    theme: 'theme1',
    accounts: [],
    sessions: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserFromCookie = async () => {
      try {
        const res = await fetch('/api/check-user', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent with the request
        });
        const data = await res.json();
        if (!res.ok) {
          console.error('User check failed:', res.status);
          setUser(data.user);
          return;
        }
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setUser({
          id: '',
          name: null,
          email: null,
          password: null,
          theme: 'theme1',
          accounts: [],
          sessions: [],
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFromCookie();
  }, []);

  return { user, loading };
};
