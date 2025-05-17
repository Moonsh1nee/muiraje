import { Header } from '@/assets/components/catalog/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muiraje Catalog',
  description: 'Muiraje Catalog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru en">
      <body>
        <Header />
        {children}
        </body>
    </html>
  );
}
