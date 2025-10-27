import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Capital Wars 2050 - Economic Strategy Game",
  description: "Build your corporate empire in a world of AI, space exploration, and dynamic markets.",
  keywords: ["strategy game", "economics", "board game", "multiplayer", "finance education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}