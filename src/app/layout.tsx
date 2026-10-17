import type { Metadata } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
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
  title: "Maison Atelier — Residential Construction",
  description:
    "A construction atelier for quiet, lasting houses. Walk through new homes designed from the inside out.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
