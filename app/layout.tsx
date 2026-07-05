import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Matthew Richards',
  description: 'Curiosity Creates Momentum. Building Better Systems. Creating Better Experiences.',
  openGraph: {
    title: 'Matthew Richards',
    description: 'Curiosity Creates Momentum.',
    type: 'website',
  },
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
