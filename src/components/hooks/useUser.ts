'use client';

import { useState, useEffect } from 'react';
import { User as PrismaUser, Account, Session } from '@prisma/client';

type User = PrismaUser & {
  accounts: Account[];
  sessions: Session[];
};

export const useUser = () => {
  const [user, setUser] = useState<User>({
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
          credentials: 'include', // <== This ensures cookies are sent with the request
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
