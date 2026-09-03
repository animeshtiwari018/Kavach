import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio OS",
  description: "Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans h-full antialiased`}>
      <head>
        <link rel="preload" href="/images/kavach.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/browser.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/vscode.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/Para_Skull.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/Terminal.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/github.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/youtube.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/spotify.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/Be%20Disciplind.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" href="/images/bg2.svg" as="image" type="image/svg+xml" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
