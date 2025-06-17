import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muiraje Cart',
  description: 'Muiraje Cart',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
