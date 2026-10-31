import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Capital Wars — The Orbital Economy",
  description:
    "A circular property strategy game. Buy skylines, trade empires, bid in auctions, and survive a living global economy with friends.",
  icons: { icon: "/orbit.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
