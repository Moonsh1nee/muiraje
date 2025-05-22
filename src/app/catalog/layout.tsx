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
  return <>{children}</>;
}
