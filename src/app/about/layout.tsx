import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muiraje About',
  description: 'Muiraje About',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
