import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = `${profile.shortName} | .NET Full Stack Developer`;
const description =
  ".NET Full Stack Developer in Bangalore with 2 years of experience building web applications with ASP.NET MVC, ASP.NET Core, C#, MySQL, Bootstrap and jQuery.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [".NET Developer", "Full Stack Developer", "ASP.NET Core", "ASP.NET MVC", "C#", "MySQL", "SQL Server", "Bootstrap", "jQuery", "Bangalore", profile.name],
  authors: [{ name: profile.name, url: profile.linkedin || undefined }],
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
  jobTitle: ".NET Full Stack Developer",
  worksFor: { "@type": "Organization", name: profile.currentCompany },
  alumniOf: { "@type": "CollegeOrUniversity", name: "JNTU College of Engineering, Anantapur" },
  email: `mailto:${profile.email}`,
  url: siteUrl,
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
  knowsAbout: ["C#", "ASP.NET MVC", "ASP.NET Core", "MySQL", "SQL Server", "JavaScript", "jQuery", "Bootstrap", "Web Application Development"],
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
