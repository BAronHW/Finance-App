"use client"

import { AnimatedListDemo } from '@/components/AnimatedListDemo'
import WordPullUp from '@/components/magicui/word-pull-up'
import { MeteorDemo } from '@/components/MeteorsDemo'
import { SignUpForm } from '@/components/SignUpForm'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React from 'react'
import { auth, provider } from '@/lib/Firebase';
import { Button } from '@/components/ui/button';
import styles from './sign-up.module.css'
import { firebaseGmailSignin } from '../firebase-auth'
import '@/app/globals.css'

const SignUpPage = () => {
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
                onClick={firebaseGmailSignin}
                variant="outline"
                className={`${styles.paddedButton} w-full bg-white text-gray-800 hover:bg-gray-100`}
              >
                Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignUpPage;