import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muiraje Documents',
  description: 'Muiraje Documents',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
