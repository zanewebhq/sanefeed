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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
