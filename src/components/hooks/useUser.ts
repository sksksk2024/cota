import { useState, useEffect } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserFromCookie = async () => {
      try {
        const res = await fetch('/api/check-user', {
          credentials: 'include', // <== This ensures cookies are sent with the request
        });
        if (!res.ok) {
          console.error('User check failed:', res.status);
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setUser(null);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFromCookie();
  }, []);

  return { user, loading };
};
