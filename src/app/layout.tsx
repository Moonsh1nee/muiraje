import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Muiraje",
  description: "Muiraje",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru en" style={{ scrollBehavior: "smooth" }}>
      <body>{children}</body>
    </html>
  );
}