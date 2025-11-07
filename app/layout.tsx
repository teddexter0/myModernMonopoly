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
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}