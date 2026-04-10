import type { Metadata } from "next";
import { DM_Sans, Literata } from "next/font/google";
import { NoSaveProvider } from "@/components/no-save-provider";
import { SacredScrollBackdrop } from "@/components/sacred-scroll-backdrop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/content";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Free repository of Pushti Sampraday granthas in Sanskrit, Braj, Hindi, and Gujarati. Original works of Vallabhacharya and lineage acharyas, available as PDFs.",
  openGraph: {
    title: site.name,
    description:
      "Repository of Pushti Bhakti Margiya granthas — non-profit, freely downloadable PDFs.",
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${literata.variable} h-full scroll-smooth`}
    >
      <body className="relative flex min-h-full flex-col font-sans antialiased">
        <NoSaveProvider />
        <SacredScrollBackdrop />
        <div className="relative z-10 flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
