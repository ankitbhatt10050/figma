import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Drawing",
  description: "Drawing",
  icons: [{ rel: "icon", url: "/figma-logo.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>{children}</body>
    </html>
  );
}
