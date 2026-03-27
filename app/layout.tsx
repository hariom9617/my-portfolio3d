import type { Metadata } from "next";
import "./globals.css";
import { LoadingProvider } from "@/components/ui/loading/LoadingProvider";
import Navbar from "@/components/ui/navbar/Navbar";
import Cursor from "@/components/ui/Cursor";
import CharacterCanvas from "@/components/CharacterCanvas";
import SocialIcons from "@/components/ui/SocialIcons";
import Footer from "@/components/Footer";

const SITE_URL = "https://hariom-patil.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hariom Patil – MERN Stack Developer | React & Node.js Expert",
    template: "%s | Hariom Patil",
  },
  description:
    "Hariom Patil is a MERN Stack Developer from Indore, India specializing in React, Next.js, Node.js, and MongoDB. Building scalable web apps, SaaS platforms, and 3D interactive experiences.",
  keywords: [
    "Hariom Patil",
    "Hariom Patil React Developer",
    "Hariom Patil MERN Developer",
    "Hariom Patil Full Stack Developer",
    "Hariom Patil Node.js Developer",
    "Hariom Patil Next.js Developer",
    "MERN Stack Developer India",
    "React Developer Indore",
    "Full Stack Developer portfolio",
  ],
  authors: [{ name: "Hariom Patil", url: SITE_URL }],
  creator: "Hariom Patil",
  publisher: "Hariom Patil",
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
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Hariom Patil – Portfolio",
    title: "Hariom Patil – MERN Stack Developer | React & Node.js Expert",
    description:
      "Hariom Patil is a MERN Stack Developer from Indore, India specializing in React, Next.js, Node.js, and MongoDB. Explore projects, skills, and experience.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hariom Patil – MERN Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hariom Patil – MERN Stack Developer",
    description:
      "MERN Stack Developer building scalable web apps, SaaS tools & 3D experiences. React · Next.js · Node.js · MongoDB.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hariom Patil",
  url: SITE_URL,
  image: `${SITE_URL}/images/portfolio3d.png`,
  jobTitle: "MERN Stack Developer",
  description:
    "Hariom Patil is a MERN Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building scalable web applications, SaaS platforms, and interactive 3D portfolios.",
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "MERN Stack",
    "Three.js",
    "Express.js",
    "Angular",
    "Full Stack Development",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/hariom9617",
    "https://www.linkedin.com/in/hariom-patil",
    "https://replyzen.hariom-patil.in",
    "https://prism.hariom-patil.in",
    "https://techbay.hariom-patil.in",
    "https://dharamshala-management.hariom-patil.in",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "Hariom Patil – MERN Stack Developer Portfolio",
  description:
    "Portfolio of Hariom Patil, a MERN Stack Developer from Indore, India.",
  author: {
    "@type": "Person",
    name: "Hariom Patil",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* JSON-LD in body — Next.js App Router recommended pattern (avoids
            hydration mismatch caused by browser extensions injecting into <head>) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]),
          }}
        />
        <Cursor />
        <LoadingProvider>
          <CharacterCanvas />
          <SocialIcons />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
