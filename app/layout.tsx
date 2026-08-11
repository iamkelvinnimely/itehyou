import type { Metadata } from "next";
import Script from "next/script";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "iTehYou — African Music. Global Reach.",
  description:
    "A new platform built to help African artists share their music, connect with listeners, and reach audiences around the world.",
  keywords: [
    "African music",
    "African artists",
    "African music platform",
    "African music streaming",
    "iTehYou",
  ],
  openGraph: {
    title: "iTehYou — African Music. Global Reach.",
    description:
      "A new platform built for African artists and music lovers around the world.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "iTehYou — African Music. Global Reach. Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iTehYou — African Music. Global Reach.",
    description:
      "A new platform built for African artists and music lovers around the world.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full bg-background font-sans text-text-primary antialiased">
        {children}
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
