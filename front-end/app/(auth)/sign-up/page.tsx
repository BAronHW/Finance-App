"use client"

import WordPullUp from '@/components/magicui/word-pull-up'
import { MeteorDemo } from '@/components/MeteorsDemo'
import { SignUpForm } from '@/components/SignUpForm'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { auth, provider } from '@/lib/Firebase';
import { Button } from '@/components/ui/button';
import styles from './sign-up.module.css'
import { firebaseGmailSignin } from '@/lib/firebase-auth';
import '@/app/globals.css'
import { Router } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

const SignUpPage = () => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);


  const [registeredUser] = useAuthState(auth)

  if(!registeredUser) {
    router.push('/')
  }

  const gmailSignIn = () => {
    setIsLoading(true);
    firebaseGmailSignin(router)
      .then(() => router.push('/'))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="relative min-h-screen w-full overflow-y-scroll">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <MeteorDemo />
      </div>
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 flex-col gap-6 pt-28">
        <WordPullUp
            className="text-4xl font-bold tracking-[-0.02em] text-black md:text-7xl md:leading-[5rem]"
            words="FinApp" 
        />
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Sign In</h2>
            <SignUpForm />
            <div className="mt-4 text-center">
              <p className="text-sm text-black mb-2">Or sign in with</p>
              <Button
                onClick={gmailSignIn}
                variant="outline"
                className={`${styles.paddedButton} w-full bg-white text-gray-800 hover:bg-gray-100`}
              >
                Google
              </Button>
              <Button onClick={() => signOut(auth)}>
                log-out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignUpPage;