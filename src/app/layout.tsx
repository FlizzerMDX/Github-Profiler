import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "@/components/auth/session-provider";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { auth } from "@/services/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GHProfiler",
  description: "Your solution to get you generated Readme GitHub Profil!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col dark`}
      >
        <SessionProvider session={session}>
          <main className="m-auto">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
