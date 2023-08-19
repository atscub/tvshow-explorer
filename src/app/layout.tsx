import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Show explorer",
  description:
    "Lookup all the tv series you want and their episodes in one place",
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
