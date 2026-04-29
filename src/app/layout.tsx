import type { Metadata } from "next";
import { Bebas_Neue, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yousef Designs — Experimental Digital Designer",
  description:
    "Yousef Khaled — Multidisciplinary designer building brand identities, product interfaces, and web experiences that refuse to blend in. Based in Cairo, Egypt.",
  keywords: [
    "Yousef Khaled",
    "Yousef Designs",
    "digital designer",
    "brand identity",
    "UI/UX design",
    "web design",
    "Cairo",
    "Egypt",
  ],
  authors: [{ name: "Yousef Khaled" }],
  openGraph: {
    title: "Yousef Designs — Experimental Digital Designer",
    description:
      "Multidisciplinary designer building brand identities, product interfaces, and web experiences that refuse to blend in.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yousef Designs — Experimental Digital Designer",
    description:
      "Multidisciplinary designer building brand identities, product interfaces, and web experiences that refuse to blend in.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Skip link for keyboard navigation */}
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
