import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { AnimatedBeamDemo } from '@/components/AnimatedBeamDemo';
import { BentoDemo } from '@/components/BentoDemo';
import { Button } from '@/components/ui/button';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header name='Aaron' appMoto='Manage your student funds' accBal={10} />
      </div>
      <main className="flex-grow flex items-center justify-center flex-col gap-10 m-7">
        <BentoDemo />
        <div className="mt-6 space-y-4 text-center">
          <p className="text-lg">Welcome to your dashboard!</p>
          <Link href="/sign-in" passHref>
            <Button>Go to Sign In</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}