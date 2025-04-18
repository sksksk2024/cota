import ThemeProvider from '@/components/ThemeProvider';
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`antialiased relative`}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
