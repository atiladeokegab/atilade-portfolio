import type { Metadata } from "next";
import { Inter, Instrument_Serif, Space_Grotesk, Caveat } from "next/font/google";

import "./globals.css";
import Footer from "@/components/Footer";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif"
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-space-grotesk",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://atilade.uk'),
  title: {
    default: "Atilade Gabriel Oke",
    template: "%s | Atilade Oke",
  },
  description: "Atilade Gabriel Oke. BEng Electrical Engineering at the University of Manchester. Founder of Refinery, IBM Z Student Ambassador #1 worldwide.",
  keywords: [
    "Atilade Gabriel Oke",
    "Atilade Oke",
    "Refinery",
    "IBM Z",
    "COBOL",
    "Compliance",
    "Founder",
    "University of Manchester",
    "Electrical Engineering",
    "Portfolio",
  ],
  authors: [{ name: "Atilade Gabriel Oke", url: "https://atilade.uk" }],
  creator: "Atilade Gabriel Oke",
  publisher: "Atilade Gabriel Oke",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Atilade Gabriel Oke",
    description: "Atilade Gabriel Oke. BEng Electrical Engineering at the University of Manchester. Founder of Refinery, IBM Z Student Ambassador #1 worldwide.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://atilade.uk',
    siteName: "Atilade Gabriel Oke",
    images: [
      {
        url: '/me.jpg',
        width: 1200,
        height: 900,
        alt: 'Atilade Gabriel Oke',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Atilade Gabriel Oke",
    description: "Atilade Gabriel Oke. Founder of Refinery. IBM Z Student Ambassador #1 worldwide.",
    images: ['/me.jpg'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://atilade.uk',
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${caveat.variable}`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atilade Gabriel Oke",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://atilade.uk",
              jobTitle: "Founder",
              worksFor: { "@type": "Organization", name: "Refinery" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "University of Manchester" },
              sameAs: ["https://github.com/atiladeokegab", "https://www.linkedin.com/in/atiladeoke/"],
            }),
          }}
        />
        <Header />
        <main className="pt-20 lg:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
