'use client'

import Link from 'next/link';
import Header from '@/components/customComponents/Header';
import { Button } from '@/components/ui/button';
import TestComp from '@/components/customComponents/testComp';
import "../globals.css"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center flex-col gap-10 m-7">
        <div className="mt-6 space-y-4 text-center">
          <p className="text-lg">Welcome to your dashboard!</p>
          <Link href="/sign-in" passHref>
            <Button>Go to Sign In</Button>
          </Link>
          <p className="text-lg">New user?</p>
          <Link href="/sign-up" passHref>
            <Button>Go to Sign Up</Button>
          </Link>
          <TestComp />
        </div>
      </main>
    </div>
  );
}