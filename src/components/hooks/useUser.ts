import { useState, useEffect } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserFromCookie = async () => {
      try {
        const res = await fetch('/api/check-user');
        if (!res.ok) {
          console.error('User check failed:', res.status);
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Error fetching user:', err);
        setUser(null);
      }
    };

    fetchUserFromCookie();
  }, []);

  return user;
};
