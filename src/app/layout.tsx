import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.scss";
import { SITE_NAME } from "@/constants/seo.constants";
import { Providers } from "./providers";
import { Toaster } from 'sonner';

const zen = Noto_Sans({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: "--font-zen",
  style: ['normal'],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Planner service developed by @bandana_ref"
};

/**
 * Root layout component for the application.
 * Provides the base HTML structure with Zen font, providers, and a dark-themed toast notification system.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element} The root HTML layout of the application
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zen.className}`}
      >
        <Providers>
          {children}{' '}
          <Toaster
            theme="dark"
            position="bottom-right"
            duration={1500}
          />
        </Providers>
      </body>
    </html>
  );
}
