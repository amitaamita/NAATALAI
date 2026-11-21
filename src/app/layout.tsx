import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { EnregistrerServiceWorker } from "@/ui/enregistrer-sw";
import "@/styles/globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "NAATAL AI", template: "%s · NAATAL AI" },
  description: "Assistant agricole intelligent, multilingue et multimodal pour le Sénégal.",
  applicationName: "NAATAL AI",
};

export const viewport: Viewport = {
  themeColor: "#1f5c3a",
  width: "device-width",
  initialScale: 1,
};

export default async function RacineLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <EnregistrerServiceWorker />
      </body>
    </html>
  );
}
