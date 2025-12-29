import type { Metadata } from "next";
import { Space_Grotesk, Source_Sans_3 } from "next/font/google";
import BackgroundAudioShell from "@/app/components/BackgroundAudioShell";
import "./globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading"
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Private Deck Viewer",
  description: "A private pitch deck viewer",
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${heading.variable} ${body.variable} min-h-screen bg-ink`}>
        <BackgroundAudioShell />
        {children}
      </body>
    </html>
  );
}
