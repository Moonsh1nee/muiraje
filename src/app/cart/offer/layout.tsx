import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muiraje Offer',
  description: 'Muiraje Offer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
