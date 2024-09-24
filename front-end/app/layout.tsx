// app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloWrapper from "@/components/Wrappers/ApolloWrapper";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FinApp",
  description: "A Personal Banking App aimed at helping students manage their finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white`}>
        <ApolloWrapper>{children}
          <DotPattern
          width={40}
          height={40}
          cx={1}
          cy={1}
          cr={1}
          />
        
        </ApolloWrapper>
      </body>
    </html>
  );
}