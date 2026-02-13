import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "@/components/auth/session-provider";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { auth } from "@/services/auth";
import { Toaster } from "@/components/ui/sonner";

import MoonarrIconLight from '../../public/moonarr-light.webp'
import MoonarrIconDark from '../../public/moonarr-dark.webp'

// Vercel
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { User } from "@/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moonarr",
  description: "Your solution to get you generated Readme GitHub Profil!",
  icons: MoonarrIconDark.src
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  const user: User = session?.user as User;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col dark`}
      >
        <SessionProvider session={session}>
          <Header user={user}/>
          <main className="m-auto">
            {children}
          </main>
          <Footer/>
          <Toaster position="top-center"/>
        </SessionProvider>
        <SpeedInsights/>
        <Analytics/>
      </body>
    </html>
  );
}
