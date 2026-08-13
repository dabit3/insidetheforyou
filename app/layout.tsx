import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "insidetheforyou",
  description: "A plain-English guide to the For You feed.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
