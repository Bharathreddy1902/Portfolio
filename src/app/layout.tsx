import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = `${profile.shortName} | AI Engineer · ML Engineer · GenAI Engineer`;
const description =
  "AI / ML Engineer building production GenAI agents, LangGraph + RAG chatbots, computer-vision platforms and forecasting systems. ~92% less ML monitoring effort, 82% less inventory waste, 6 vision models in production.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["AI Engineer", "Machine Learning Engineer", "GenAI Engineer", "LangGraph", "RAG", "Agentic AI", "MLOps", "Computer Vision", "Data Scientist", profile.name],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: { type: "profile", url: siteUrl, title, description, siteName: profile.name },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#03050b", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "AI Engineer / Data Scientist",
  worksFor: { "@type": "Organization", name: profile.currentCompany },
  alumniOf: { "@type": "CollegeOrUniversity", name: "KSRM College of Engineering" },
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: ["Generative AI", "Agentic AI", "LangGraph", "Retrieval-Augmented Generation", "Machine Learning", "Computer Vision", "MLOps", "Demand Forecasting"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-electric-500 focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
