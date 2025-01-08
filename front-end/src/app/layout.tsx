import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ApolloWrapper } from "@/components/Wrappers/ApolloWrapper";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { AuthProvider, useAuth } from "@/lib/Contexts/AuthContext";

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
  title: "Fin",
  description: "A Personal Banking App aimed at helping students manage their finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, "bg-white")}>
        <DotPattern
          width={30}
          height={30}
          cx={1}
          cy={1}
          cr={1}
        />
        <AuthProvider><ApolloWrapper>{children}</ApolloWrapper></AuthProvider>
      </body>
    </html>
  );
}