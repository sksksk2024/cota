import { Providers } from '@/components/Providers';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: `Cota Alexandru's website`,
  description: `Cota Alexandru's playground from where you can learn new things, play minigames, and know me better! Have a good time here! 😊`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="icon" href="/cotaFavicon.svg" sizes="32x32" />
        <link rel="apple-touch-icon" href="/cotaFavicon.svg" sizes="32x32" />
      </head>
      <body className={`antialiased relative`}>
        <Providers>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
