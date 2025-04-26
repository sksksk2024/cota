// // hooks/useHydrateTheme.ts
// 'use client';

// import { useEffect } from 'react';
// import { useThemeStore } from './useThemeStore';
// import { useUser } from './useUser';
// import { useSession } from 'next-auth/react';

// export const useHydrateTheme = () => {
//   const { setTheme } = useThemeStore();
//   const { user } = useUser();
//   const { data: session } = useSession();

//   useEffect(() => {
//     const fetchTheme = async () => {
//       const email = user?.email || session?.user?.email;

//       if (!email) {
//         setTheme('theme1'); // default
//         return;
//       }

//       try {
//         const res = await fetch(`/api/theme`);
//         const data = await res.json();
//         if (data.theme === 'theme1' || data.theme === 'theme2') {
//           setTheme(data.theme);
//         }
//       } catch (err) {
//         console.error('Failed to fetch theme on hydrate:', err);
//       }
//     };

//     fetchTheme();
//   }, [user?.email, session?.user?.email, setTheme]);
// };
