import type { Metadata } from "next";
import { Lilita_One, Bungee } from "next/font/google";
import "./globals.css";
const mainFont = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-main",
});
const accentFont = Bungee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
});
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
    <html lang="en" className={`${mainFont.variable} ${accentFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
