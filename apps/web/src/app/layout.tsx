import '@sanefeed/ui/styles/globals.css';
import { Fira_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  fallback: ['sans-serif'],
});

export const metadata = {
  title: 'SaneFeed',
  description: 'A user-friendly, feature-rich RSS reader',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaSans.className}>
      <body>
        <Toaster position="top-center" />

        {children}
      </body>
    </html>
  );
}
