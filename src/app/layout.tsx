// src/app/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Virtual Family House',
  description: 'Create virtual family members for emotional companionship',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
