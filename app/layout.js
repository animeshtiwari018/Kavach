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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
