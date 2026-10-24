import type { Metadata, Viewport } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Intro, introScript } from "@/components/intro";
import { MobileNav } from "@/components/mobile-nav";
import { IntroSettle, ScrollReveal, ScrollScenes } from "@/components/motion";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { serviceArea, site } from "@/data/site";
import "./globals.css";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const body = Josefin_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — Construction in ${serviceArea}`,
    template: `%s — ${site.fullName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.fullName,
    locale: "en_PK",
  },
};

export const viewport: Viewport = {
  // Lets the bottom bar sit above the iPhone home indicator.
  viewportFit: "cover",
  themeColor: "#1c1915",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      // The intro script adds .intro-seen to <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Intro />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <WhatsAppButton />
        <ScrollReveal />
        <ScrollScenes />
        <IntroSettle />
      </body>
    </html>
  );
}
