"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TestComp from "@/components/customComponents/testComp";
import "../globals.css";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <main className="gap-10 m-7">
        <div className="absolute right-20 grid grid-cols-2 gap-2">
          <Link href="/sign-in" passHref>
            <Button size="lg" className="text-xl rounded-full" variant="default">Login</Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button size="lg" className="text-xl rounded-full border-solid border-2 border-slate-400" variant="secondary">Sign Up</Button>
          </Link>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col space-y-10">
            <h1 className="text-9xl font-sans text-center">FinApp</h1>
            <p className="relative t-100 text-left text-5xl font-mono max-w-3xl">
              Your personal finance tracker
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
