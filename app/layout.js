import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kavach OS",
  description: "Developer Portfolio",
  icons: {
    icon: "/images/Para_Skull.svg",
  },
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
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
