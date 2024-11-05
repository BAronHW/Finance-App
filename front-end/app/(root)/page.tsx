'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { BentoDemo } from '@/components/BentoDemo';
import { Button } from '@/components/ui/button';
import TestComp from '@/components/testComp';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    console.log(isAuthenticated)
    if(!isAuthenticated){
      router.push('/sign-in')
    } else{
      setIsLoading(false);
    }
  }, [isAuthenticated])

  console.log(isAuthenticated)

  if (isLoading || !isAuthenticated) {
    return null;
  }

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